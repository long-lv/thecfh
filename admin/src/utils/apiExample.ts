// Example usage of API utility
import { api } from './apiUtil';

// Example interfaces for type safety
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// Example API calls
export const userApi = {
  // GET - Fetch all users
  getUsers: async () => {
    try {
      const response = await api.get<User[]>('/users');
      return response;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  // GET - Fetch single user
  getUser: async (id: number) => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  },

  // POST - Create new user
  createUser: async (userData: CreateUserRequest) => {
    try {
      const response = await api.post<User>('/users', userData);
      return response;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },

  // PUT - Update user
  updateUser: async (id: number, userData: UpdateUserRequest) => {
    try {
      const response = await api.put<User>(`/users/${id}`, userData);
      return response;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  },

  // DELETE - Delete user
  deleteUser: async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw error;
    }
  },
};

// Example usage in React component
export const exampleUsage = {
  // In a React component or hook
  fetchData: async () => {
    try {
      // Simple GET request
      const users = await api.get('/users');
      console.log('Users:', users.data);

      // POST request with data
      const newUser = await api.post('/users', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      console.log('Created user:', newUser.data);

      // PUT request
      const updatedUser = await api.put('/users/1', {
        name: 'Jane Doe'
      });
      console.log('Updated user:', updatedUser.data);

      // DELETE request
      await api.delete('/users/1');
      console.log('User deleted');

    } catch (error) {
      console.error('API Error:', error);
    }
  }
};
