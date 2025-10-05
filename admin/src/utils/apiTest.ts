// Test file for API utility
import { api } from './apiUtil';

// Test function to demonstrate API usage
export const testApiUsage = async () => {
  console.log('🧪 Testing API Utility...');

  try {
    // Test GET request
    console.log('\n📡 Testing GET request...');
    const getResponse = await api.get('/test-endpoint');
    console.log('✅ GET Response:', getResponse);

    // Test POST request
    console.log('\n📡 Testing POST request...');
    const postData = { name: 'Test User', email: 'test@example.com' };
    const postResponse = await api.post('/test-endpoint', postData);
    console.log('✅ POST Response:', postResponse);

    // Test PUT request
    console.log('\n📡 Testing PUT request...');
    const putData = { name: 'Updated User' };
    const putResponse = await api.put('/test-endpoint/1', putData);
    console.log('✅ PUT Response:', putResponse);

    // Test DELETE request
    console.log('\n📡 Testing DELETE request...');
    const deleteResponse = await api.delete('/test-endpoint/1');
    console.log('✅ DELETE Response:', deleteResponse);

    console.log('\n🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API Test Error:', error);
  }
};

// Example of how to use in a React component
export const useApiExample = () => {
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  };

  const createUser = async (userData: { name: string; email: string }) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };

  const updateUser = async (id: number, userData: { name?: string; email?: string }) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  };

  return {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
