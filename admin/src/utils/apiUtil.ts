import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, CancelTokenSource } from 'axios';

// Custom Error Classes
export class ApiError extends Error {
  public status: number;
  public data?: unknown;
  public isNetworkError: boolean;
  public isTimeoutError: boolean;
  public isCanceled: boolean;

  constructor(message: string, status: number = 0, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.isNetworkError = status === 0;
    this.isTimeoutError = message.includes('timeout');
    this.isCanceled = message.includes('canceled');
  }
}

export class RefreshTokenError extends ApiError {
  constructor(message: string = 'Refresh token failed') {
    super(message, 401);
    this.name = 'RefreshTokenError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = 'Network error') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

// Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Request cancellation
const activeRequests = new Map<string, CancelTokenSource>();

// Base API configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  // Không set Content-Type mặc định để cho phép axios tự động detect
});

// Token management
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Function to get token from cookie (mock implementation)
const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Mock token for development - replace with actual cookie reading logic
  const mockToken = 'mock-bearer-token-12345';
  
  // In real implementation, you would read from cookie:
  // const cookies = document.cookie.split(';');
  // const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
  // return tokenCookie ? tokenCookie.split('=')[1] : null;
  
  console.log('🍪 Getting token from cookie:', maskToken(mockToken));
  return mockToken;
};

// Function to mask token in logs for security
const maskToken = (token: string | null): string => {
  if (!token) return 'null';
  if (token.length <= 8) return '***';
  return token.substring(0, 4) + '***' + token.substring(token.length - 4);
};

// Function to refresh token
const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('🔄 Refreshing access token...');
      
      // Get refresh token from cookie
      const refreshToken = getRefreshTokenFromCookie();
      if (!refreshToken) {
        throw new RefreshTokenError('No refresh token found');
      }

      // Call refresh token endpoint
      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data as RefreshTokenResponse;
      
      // Update tokens in storage
      setTokensInStorage(accessToken, newRefreshToken || refreshToken);
      
      console.log('✅ Token refreshed successfully');
      resolve(accessToken);
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      // Clear tokens on refresh failure
      clearTokensFromStorage();
      reject(new RefreshTokenError('Failed to refresh token'));
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  return refreshPromise;
};

// Helper functions for token management
const getRefreshTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Mock refresh token
  const mockRefreshToken = 'mock-refresh-token-67890';
  console.log('🍪 Getting refresh token from cookie:', maskToken(mockRefreshToken));
  return mockRefreshToken;
};

const setTokensInStorage = (accessToken: string, refreshToken: string) => {
  // In real implementation, you would set cookies or localStorage
  console.log('💾 Setting tokens in storage:', {
    accessToken: maskToken(accessToken),
    refreshToken: maskToken(refreshToken)
  });
};

const clearTokensFromStorage = () => {
  console.log('🗑️ Clearing tokens from storage');
  // In real implementation, you would clear cookies or localStorage
};

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Bearer token to headers
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development (with masked token)
    if (process.env.NODE_ENV === 'development') {
      const maskedHeaders = { ...config.headers };
      if (maskedHeaders.Authorization) {
        maskedHeaders.Authorization = `Bearer ${maskToken(token)}`;
      }
      
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: maskedHeaders,
        data: config.data,
      });
      
      // Log token status
      if (token) {
        console.log('🔐 Bearer Token added:', `Bearer ${maskToken(token)}`);
      } else {
        console.log('⚠️ No Bearer Token found');
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('🔄 Attempting to refresh token...');
        const newToken = await refreshAccessToken();
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        // Redirect to login or clear session
        clearTokensFromStorage();
        return Promise.reject(new RefreshTokenError('Session expired. Please login again.'));
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as { message?: string } | undefined;
      const errorMessage = errorData?.message || error.message;
      const status = error.response.status;
      
      console.error('❌ API Error Response:', {
        status,
        message: errorMessage,
        data: error.response.data,
      });

      // Handle specific status codes
      switch (status) {
        case 401:
          console.warn('🔒 Unauthorized - Token may be expired');
          return Promise.reject(new ApiError('Unauthorized access', 401, error.response.data));
        case 403:
          console.warn('🚫 Forbidden - Insufficient permissions');
          return Promise.reject(new ApiError('Insufficient permissions', 403, error.response.data));
        case 404:
          console.warn('🔍 Not Found - Resource not found');
          return Promise.reject(new ApiError('Resource not found', 404, error.response.data));
        case 500:
          console.error('💥 Server Error - Internal server error');
          return Promise.reject(new ApiError('Internal server error', 500, error.response.data));
        default:
          console.error(`❌ HTTP Error ${status}: ${errorMessage}`);
          return Promise.reject(new ApiError(errorMessage, status, error.response.data));
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network Error:', error.message);
      return Promise.reject(new NetworkError('Network error - Please check your connection'));
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error('⏰ Timeout Error:', error.message);
      return Promise.reject(new ApiError('Request timeout', 0));
    } else if (axios.isCancel(error)) {
      // Request was canceled
      console.warn('🚫 Request canceled:', error.message);
      return Promise.reject(new ApiError('Request canceled', 0));
    } else {
      // Other error
      console.error('❌ Unknown Error:', error.message);
      return Promise.reject(new ApiError(error.message || 'An unexpected error occurred', 0));
    }
  }
);

// Request cancellation helpers
export const cancelRequest = (requestId: string) => {
  const cancelTokenSource = activeRequests.get(requestId);
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled by user');
    activeRequests.delete(requestId);
    console.log(`🚫 Request ${requestId} canceled`);
  }
};

export const cancelAllRequests = () => {
  activeRequests.forEach((cancelTokenSource, requestId) => {
    cancelTokenSource.cancel('All requests canceled');
    console.log(`🚫 Request ${requestId} canceled`);
  });
  activeRequests.clear();
  console.log('🚫 All requests canceled');
};

// API methods
export const api = {
  // GET request
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig & { requestId?: string }): Promise<ApiResponse<T>> => {
    const requestId = config?.requestId || `get-${Date.now()}-${Math.random()}`;
    const cancelTokenSource = axios.CancelToken.source();
    
    if (config?.requestId) {
      activeRequests.set(requestId, cancelTokenSource);
    }

    try {
      const response = await apiClient.get(url, {
        ...config,
        cancelToken: cancelTokenSource.token
      });
      
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      throw error;
    }
  },

  // POST request
  post: async <T = unknown>(
    url: string, 
    data?: unknown, 
    config?: AxiosRequestConfig & { requestId?: string }
  ): Promise<ApiResponse<T>> => {
    const requestId = config?.requestId || `post-${Date.now()}-${Math.random()}`;
    const cancelTokenSource = axios.CancelToken.source();
    
    if (config?.requestId) {
      activeRequests.set(requestId, cancelTokenSource);
    }

    try {
      const response = await apiClient.post(url, data, {
        ...config,
        cancelToken: cancelTokenSource.token
      });
      
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      throw error;
    }
  },

  // PUT request
  put: async <T = unknown>(
    url: string, 
    data?: unknown, 
    config?: AxiosRequestConfig & { requestId?: string }
  ): Promise<ApiResponse<T>> => {
    const requestId = config?.requestId || `put-${Date.now()}-${Math.random()}`;
    const cancelTokenSource = axios.CancelToken.source();
    
    if (config?.requestId) {
      activeRequests.set(requestId, cancelTokenSource);
    }

    try {
      const response = await apiClient.put(url, data, {
        ...config,
        cancelToken: cancelTokenSource.token
      });
      
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      throw error;
    }
  },

  // DELETE request
  delete: async <T = unknown>(url: string, config?: AxiosRequestConfig & { requestId?: string }): Promise<ApiResponse<T>> => {
    const requestId = config?.requestId || `delete-${Date.now()}-${Math.random()}`;
    const cancelTokenSource = axios.CancelToken.source();
    
    if (config?.requestId) {
      activeRequests.set(requestId, cancelTokenSource);
    }

    try {
      const response = await apiClient.delete(url, {
        ...config,
        cancelToken: cancelTokenSource.token
      });
      
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      if (config?.requestId) {
        activeRequests.delete(requestId);
      }
      throw error;
    }
  },

  // Cancel specific request
  cancel: cancelRequest,
  
  // Cancel all requests
  cancelAll: cancelAllRequests,
};

// Export the axios instance for advanced usage
export { apiClient };

// Export default api object
export default api;
