# Authentication Strategy: Cookie/httpOnly vs Bearer Token

## 🔐 Chiến lược Authentication

### 1. **Cookie/httpOnly Strategy** (Recommended for Production)

#### ✅ Ưu điểm:
- **Bảo mật cao**: httpOnly cookies không thể truy cập từ JavaScript
- **Tự động gửi**: Browser tự động gửi cookies trong mọi request
- **CSRF Protection**: Có thể kết hợp với CSRF tokens
- **XSS Resistant**: Không thể bị đánh cắp qua XSS attacks

#### ❌ Nhược điểm:
- **CORS phức tạp**: Cần cấu hình CORS với credentials
- **Domain bound**: Chỉ hoạt động trong cùng domain
- **Size limit**: Cookies có giới hạn kích thước

#### 🛠️ Implementation:
```typescript
// Server-side: Set httpOnly cookie
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 minutes
});

// Client-side: Không cần xử lý token
// Browser tự động gửi cookie
```

### 2. **Bearer Token Strategy** (Current Implementation)

#### ✅ Ưu điểm:
- **Flexible**: Hoạt động với mọi domain
- **Stateless**: Không cần lưu trữ server-side
- **Easy debugging**: Có thể thấy token trong network tab
- **Mobile friendly**: Dễ dàng implement trên mobile apps

#### ❌ Nhược điểm:
- **XSS vulnerable**: Có thể bị đánh cắp qua XSS
- **Manual handling**: Cần tự động thêm vào headers
- **Storage risk**: Lưu trữ trong localStorage/sessionStorage có rủi ro

#### 🛠️ Implementation:
```typescript
// Current implementation
const token = getTokenFromCookie();
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## 🎯 Recommendation: Hybrid Approach

### **Production**: Cookie/httpOnly + CSRF
```typescript
// Server sets httpOnly cookies
// Client không cần xử lý token
// Tự động gửi với credentials: 'include'
```

### **Development**: Bearer Token
```typescript
// Dễ debug và test
// Linh hoạt với external APIs
// Current implementation
```

## 🔄 Token Refresh Strategy

### **Access Token** (Short-lived: 15-30 minutes)
- Lưu trong httpOnly cookie hoặc memory
- Tự động refresh khi hết hạn
- Không lưu trong localStorage

### **Refresh Token** (Long-lived: 7-30 days)
- Lưu trong httpOnly cookie
- Chỉ sử dụng để refresh access token
- Xóa khi logout

## 🛡️ Security Best Practices

### 1. **Token Storage**
```typescript
// ❌ Không nên
localStorage.setItem('token', token);

// ✅ Nên dùng
// httpOnly cookie (server-side)
// hoặc memory (client-side)
```

### 2. **Token Rotation**
```typescript
// Refresh token cũng được rotate
const { accessToken, refreshToken } = await refreshAccessToken();
setTokensInStorage(accessToken, refreshToken);
```

### 3. **Request Cancellation**
```typescript
// Hủy request khi component unmount
useEffect(() => {
  return () => {
    api.cancelAll();
  };
}, []);
```

## 📋 Implementation Plan

### Phase 1: Current (Bearer Token)
- ✅ Bearer token trong headers
- ✅ Auto refresh token
- ✅ Request cancellation
- ✅ Error handling

### Phase 2: Production (Cookie/httpOnly)
- 🔄 Switch to httpOnly cookies
- 🔄 CSRF protection
- 🔄 CORS configuration
- 🔄 Server-side session management

## 🧪 Testing Strategy

### Development
```typescript
// Mock tokens for testing
const mockToken = 'mock-bearer-token-12345';
const mockRefreshToken = 'mock-refresh-token-67890';
```

### Production
```typescript
// Real cookie-based authentication
// CSRF tokens
// Secure cookie settings
```

## 📊 Comparison Table

| Feature | Cookie/httpOnly | Bearer Token |
|---------|----------------|--------------|
| Security | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| XSS Protection | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| CSRF Protection | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| CORS | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mobile Support | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Debugging | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Implementation | ⭐⭐ | ⭐⭐⭐⭐ |

## 🎯 Final Recommendation

**Current Implementation (Bearer Token)** là phù hợp cho:
- Development và testing
- External API integration
- Mobile applications
- Microservices architecture

**Future Migration (Cookie/httpOnly)** cho:
- Production web applications
- High-security requirements
- Single-page applications
- Enterprise applications
