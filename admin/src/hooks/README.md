# Global Loading Hook

Hook để quản lý loading state toàn cục trong ứng dụng.

## Cài đặt

Loading context đã được setup trong `src/app/layout.tsx`, bạn chỉ cần import và sử dụng.

## Cách sử dụng

### 1. Import hook

```tsx
import { useGlobalLoading } from '@/src/hooks/useGlobalLoading';
```

### 2. Sử dụng trong component

```tsx
const MyComponent = () => {
  const { showLoading, hideLoading, isLoading, loadingMessage } = useGlobalLoading();

  const handleSubmit = async () => {
    showLoading('Đang lưu dữ liệu...');
    try {
      await saveData();
    } finally {
      hideLoading();
    }
  };

  return (
    <button onClick={handleSubmit}>
      {isLoading ? 'Đang xử lý...' : 'Lưu'}
    </button>
  );
};
```

## API

### `showLoading(message?: string)`
Hiển thị loading overlay với message tùy chỉnh.

**Parameters:**
- `message` (optional): Message hiển thị trong loading. Default: "Đang tải..."

**Example:**
```tsx
showLoading(); // Hiển thị với message mặc định
showLoading('Đang lưu dữ liệu...'); // Hiển thị với message tùy chỉnh
showLoading('Đang xử lý yêu cầu...'); // Message khác
```

### `hideLoading()`
Ẩn loading overlay.

**Example:**
```tsx
hideLoading();
```

### `isLoading: boolean`
State hiện tại của loading (true/false).

### `loadingMessage: string`
Message hiện tại đang hiển thị.

## Ví dụ thực tế

### 1. API Call
```tsx
const fetchData = async () => {
  showLoading('Đang tải dữ liệu...');
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  } catch (error) {
    alert('Lỗi khi tải dữ liệu');
  } finally {
    hideLoading();
  }
};
```

### 2. Form Submit
```tsx
const handleSubmit = async (formData) => {
  showLoading('Đang lưu thông tin...');
  try {
    await submitForm(formData);
    alert('Lưu thành công!');
  } catch (error) {
    alert('Lỗi khi lưu');
  } finally {
    hideLoading();
  }
};
```

### 3. File Upload
```tsx
const handleFileUpload = async (file) => {
  showLoading('Đang tải file lên server...');
  try {
    const formData = new FormData();
    formData.append('file', file);
    await uploadFile(formData);
    alert('Tải file thành công!');
  } catch (error) {
    alert('Lỗi khi tải file');
  } finally {
    hideLoading();
  }
};
```

### 4. Multiple Operations
```tsx
const handleBulkOperations = async () => {
  showLoading('Đang xử lý nhiều thao tác...');
  try {
    await operation1();
    await operation2();
    await operation3();
    alert('Hoàn thành tất cả thao tác!');
  } catch (error) {
    alert('Có lỗi xảy ra');
  } finally {
    hideLoading();
  }
};
```

## Styling

Loading overlay được style với:
- **Background**: Semi-transparent black overlay
- **Z-index**: 9999 (luôn hiển thị trên cùng)
- **Position**: Fixed, cover toàn bộ viewport
- **Animation**: Smooth fade in/out
- **Spinner**: Material UI CircularProgress
- **Message**: Typography với color text.secondary

## Best Practices

1. **Always hide loading**: Sử dụng `finally` block để đảm bảo hide loading
2. **Meaningful messages**: Sử dụng message rõ ràng cho user
3. **Don't show loading for fast operations**: Chỉ show cho operations > 500ms
4. **Handle errors properly**: Always catch và handle errors
5. **Use try-finally pattern**: Đảm bảo hide loading trong mọi trường hợp

## Troubleshooting

### Loading không hiển thị
- Kiểm tra LoadingProvider đã được wrap trong layout.tsx chưa
- Kiểm tra component có import useGlobalLoading đúng không

### Loading không ẩn
- Đảm bảo gọi hideLoading() trong finally block
- Kiểm tra có error trong code không

### Multiple loading calls
- Hook tự động quản lý state, không cần lo về multiple calls
- Loading overlay chỉ hiển thị 1 lần duy nhất
