# API Utility

API utility với interceptor để thực hiện các HTTP requests một cách dễ dàng với Bearer token authentication.

## Tính năng

- ✅ Hỗ trợ đầy đủ 4 phương thức HTTP: GET, POST, PUT, DELETE
- ✅ Tự động thêm Bearer token từ cookie
- ✅ Request/Response interceptors
- ✅ Error handling tự động
- ✅ TypeScript support
- ✅ Logging trong development mode

## Cách sử dụng

### Import

```typescript
import { api } from '@/utils/apiUtil';
```

### Các phương thức

#### GET Request
```typescript
// Simple GET
const response = await api.get('/users');

// GET with config
const response = await api.get('/users', {
  params: { page: 1, limit: 10 }
});
```

#### POST Request
```typescript
// POST with data
const response = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with config
const response = await api.post('/users', userData, {
  headers: { 'Content-Type': 'application/json' }
});
```

#### PUT Request
```typescript
// PUT with data
const response = await api.put('/users/1', {
  name: 'Jane Doe'
});
```

#### DELETE Request
```typescript
// DELETE
const response = await api.delete('/users/1');
```

### TypeScript Support

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Typed response
const response = await api.get<User[]>('/users');
console.log(response.data); // TypeScript knows this is User[]
```

### Error Handling

```typescript
try {
  const response = await api.get('/users');
  console.log(response.data);
} catch (error) {
  console.error('API Error:', error.message);
  console.error('Status:', error.status);
}
```

## Cấu hình

### Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Token Authentication

Hiện tại sử dụng mock token. Để thay đổi:

1. Mở file `src/utils/apiUtil.ts`
2. Tìm function `getTokenFromCookie()`
3. Thay thế logic mock bằng logic đọc cookie thực tế:

```typescript
const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Đọc token từ cookie
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => 
    cookie.trim().startsWith('authToken=')
  );
  
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};
```

## Response Format

Tất cả responses đều có format chuẩn:

```typescript
interface ApiResponse<T> {
  data: T;           // Dữ liệu trả về
  message?: string;   // Thông báo (nếu có)
  status: number;    // HTTP status code
  success: boolean;   // Trạng thái thành công
}
```

## Error Format

Khi có lỗi, sẽ throw error với format:

```typescript
interface ApiError {
  message: string;    // Thông báo lỗi
  status: number;     // HTTP status code
  data?: any;         // Dữ liệu lỗi bổ sung
}
```

## Development Logging

Trong development mode, API utility sẽ log:
- 🚀 Request details (method, URL, headers, data)
- ✅ Response details (status, data)
- ❌ Error details (status, message)

## Advanced Usage

### Custom Axios Instance

Nếu cần sử dụng axios instance trực tiếp:

```typescript
import { apiClient } from '@/utils/apiUtil';

// Sử dụng apiClient cho các tác vụ phức tạp
const response = await apiClient.request({
  method: 'PATCH',
  url: '/users/1',
  data: { name: 'New Name' }
});
```

### Custom Headers

```typescript
const response = await api.get('/users', {
  headers: {
    'Custom-Header': 'value'
  }
});
```

## Examples

Xem file `apiExample.ts` để có thêm ví dụ chi tiết về cách sử dụng.
