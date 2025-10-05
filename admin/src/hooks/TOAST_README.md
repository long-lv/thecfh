# Toast Notifications Hook

Hook để hiển thị toast notifications với các loại message khác nhau và vị trí tùy chỉnh.

## Cài đặt

Toast context đã được setup trong `src/app/layout.tsx`, bạn chỉ cần import và sử dụng.

## Cách sử dụng

### 1. Import hook

```tsx
import { useGlobalToast } from '@/src/hooks/useGlobalToast';
```

### 2. Sử dụng trong component

```tsx
const MyComponent = () => {
  const { success, error, warning, info } = useGlobalToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Dữ liệu đã được lưu thành công!');
    } catch (error) {
      error('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };

  return (
    <button onClick={handleSave}>
      Lưu dữ liệu
    </button>
  );
};
```

## API

### Basic Usage

```tsx
const { success, error, warning, info } = useGlobalToast();

// Hiển thị toast đơn giản
success('Thành công!');
error('Có lỗi!');
warning('Cảnh báo!');
info('Thông tin!');
```

### Advanced Usage với Options

```tsx
// Toast với title
success('Đăng nhập thành công!', {
  title: 'Chào mừng bạn quay trở lại',
  duration: 5000,
});

// Toast với vị trí tùy chỉnh
info('Toast ở góc dưới bên trái!', {
  position: 'bottom-left',
  duration: 6000,
});

// Toast không thể đóng
warning('Thông báo quan trọng!', {
  closable: false,
  duration: 0, // Không tự động đóng
});
```

## Toast Types

### 1. Success Toast
```tsx
success('Dữ liệu đã được lưu thành công!');
```

### 2. Error Toast
```tsx
error('Có lỗi xảy ra khi lưu dữ liệu!');
```

### 3. Warning Toast
```tsx
warning('Vui lòng kiểm tra lại thông tin!');
```

### 4. Info Toast
```tsx
info('Thông tin mới đã được cập nhật!');
```

## Toast Positions

Có 6 vị trí có thể chọn:

```tsx
// Top positions
'top-left'     // Góc trên bên trái
'top-center'   // Giữa phía trên
'top-right'    // Góc trên bên phải (default)

// Bottom positions
'bottom-left'  // Góc dưới bên trái
'bottom-center' // Giữa phía dưới
'bottom-right' // Góc dưới bên phải
```

## Toast Options

### `title?: string`
Tiêu đề của toast, hiển thị với font đậm.

```tsx
success('Đăng nhập thành công!', {
  title: 'Chào mừng bạn quay trở lại'
});
```

### `duration?: number`
Thời gian hiển thị toast (milliseconds). Default: 4000ms.

```tsx
info('Toast hiển thị 10 giây', {
  duration: 10000
});

// Toast không tự động đóng
warning('Thông báo quan trọng', {
  duration: 0
});
```

### `position?: ToastPosition`
Vị trí hiển thị toast.

```tsx
error('Lỗi ở góc dưới bên trái!', {
  position: 'bottom-left'
});
```

### `closable?: boolean`
Cho phép đóng toast bằng nút X. Default: true.

```tsx
warning('Toast không thể đóng!', {
  closable: false
});
```

## Ví dụ thực tế

### 1. Form Validation
```tsx
const handleSubmit = async (formData) => {
  try {
    // Validate form
    if (!formData.email) {
      warning('Vui lòng nhập email!', {
        position: 'top-center'
      });
      return;
    }

    // Submit form
    await submitForm(formData);
    
    success('Form đã được gửi thành công!', {
      title: 'Thành công',
      duration: 5000
    });
  } catch (error) {
    error('Có lỗi xảy ra khi gửi form!', {
      title: 'Lỗi',
      duration: 6000
    });
  }
};
```

### 2. API Calls
```tsx
const fetchData = async () => {
  try {
    showLoading('Đang tải dữ liệu...');
    const response = await fetch('/api/data');
    const data = await response.json();
    
    success(`Đã tải ${data.length} items thành công!`);
    setData(data);
  } catch (error) {
    error('Không thể tải dữ liệu từ server!', {
      title: 'Lỗi kết nối',
      duration: 8000
    });
  } finally {
    hideLoading();
  }
};
```

### 3. File Operations
```tsx
const handleFileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    await uploadFile(formData);
    
    success('File đã được tải lên thành công!', {
      title: 'Upload thành công',
      position: 'bottom-right'
    });
  } catch (error) {
    error('Không thể tải file lên server!', {
      title: 'Upload thất bại',
      duration: 6000
    });
  }
};
```

### 4. User Actions
```tsx
const handleDelete = async (id) => {
  try {
    await deleteItem(id);
    
    success('Item đã được xóa thành công!', {
      position: 'top-center',
      duration: 3000
    });
    
    // Refresh data
    fetchData();
  } catch (error) {
    error('Không thể xóa item!', {
      title: 'Lỗi xóa',
      duration: 5000
    });
  }
};
```

### 5. Multiple Toasts
```tsx
const handleBulkAction = async (items) => {
  let successCount = 0;
  let errorCount = 0;

  for (const item of items) {
    try {
      await processItem(item);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  // Show summary
  if (successCount > 0) {
    success(`Đã xử lý thành công ${successCount} items!`, {
      title: 'Hoàn thành',
      duration: 5000
    });
  }

  if (errorCount > 0) {
    warning(`Có ${errorCount} items xử lý thất bại!`, {
      title: 'Cảnh báo',
      duration: 6000
    });
  }
};
```

## Styling

Toast được style với:
- **Background**: Material UI Alert colors
- **Icons**: Emoji icons cho mỗi loại toast
- **Animation**: Slide transition từ dưới lên
- **Shadow**: Box shadow để tạo độ sâu
- **Border radius**: 8px cho góc bo tròn
- **Z-index**: 10000 để hiển thị trên cùng

## Best Practices

1. **Use appropriate toast types**: 
   - `success` cho actions thành công
   - `error` cho lỗi
   - `warning` cho cảnh báo
   - `info` cho thông tin

2. **Keep messages concise**: Toast messages nên ngắn gọn, dễ hiểu

3. **Use titles for important messages**: Title giúp làm nổi bật thông báo quan trọng

4. **Choose appropriate duration**: 
   - Success/Info: 3-4 seconds
   - Warning: 4-5 seconds  
   - Error: 5-6 seconds

5. **Position strategically**: 
   - Top-right: Default cho most notifications
   - Top-center: Cho important messages
   - Bottom: Cho non-critical info

6. **Don't spam toasts**: Tránh hiển thị quá nhiều toast cùng lúc

## Troubleshooting

### Toast không hiển thị
- Kiểm tra ToastProvider đã được wrap trong layout.tsx chưa
- Kiểm tra component có import useGlobalToast đúng không

### Toast hiển thị sai vị trí
- Kiểm tra position value có đúng không
- Kiểm tra CSS conflicts

### Multiple toasts overlap
- Toast system tự động quản lý spacing
- Nếu vẫn overlap, kiểm tra z-index conflicts

### Toast không tự động đóng
- Kiểm tra duration value
- Kiểm tra có error trong code không
