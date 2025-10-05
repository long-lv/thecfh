# Toast Notifications Component

Toast notifications là một hệ thống thông báo hiện đại và linh hoạt cho ứng dụng React.

## Features

- ✅ **4 Toast Types**: success, error, warning, info
- ✅ **6 Positions**: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
- ✅ **Custom Options**: title, duration, position, closable
- ✅ **Auto-close**: với thời gian tùy chỉnh
- ✅ **Stack toasts**: hiển thị nhiều toast cùng lúc
- ✅ **Smooth animations**: và styling đẹp
- ✅ **TypeScript Support**: đầy đủ type safety

## Installation

Toast system đã được setup trong `src/app/layout.tsx`, bạn chỉ cần import và sử dụng.

## Basic Usage

```tsx
import { useGlobalToast } from '@/src/hooks/useGlobalToast';

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

## API Reference

### Toast Types

```tsx
// Success toast
success('Dữ liệu đã được lưu thành công!');

// Error toast
error('Có lỗi xảy ra khi lưu dữ liệu!');

// Warning toast
warning('Vui lòng kiểm tra lại thông tin!');

// Info toast
info('Thông tin mới đã được cập nhật!');
```

### Toast Options

```tsx
interface ToastOptions {
  title?: string;           // Tiêu đề của toast
  duration?: number;        // Thời gian hiển thị (ms), 0 = không tự đóng
  position?: ToastPosition; // Vị trí hiển thị
  closable?: boolean;       // Có thể đóng bằng nút X
}

type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';
```

### Advanced Usage

```tsx
// Toast với title
success('Đăng nhập thành công!', {
  title: 'Chào mừng bạn quay trở lại',
  duration: 5000,
});

// Toast với vị trí tùy chỉnh
info('Toast hiển thị ở góc dưới bên trái!', {
  position: 'bottom-left',
  duration: 6000,
});

// Toast không thể đóng
warning('Thông báo quan trọng!', {
  closable: false,
  duration: 0, // Không tự động đóng
});
```

## Examples

### Form Validation

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

### API Calls

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

### File Operations

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

### User Actions

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

### Multiple Operations

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

## Styling

Toast được style với:
- **Background**: Material UI Alert colors
- **Icons**: Emoji icons cho mỗi loại toast
- **Animation**: Smooth slide transition
- **Shadow**: Box shadow để tạo độ sâu
- **Border radius**: 8px cho góc bo tròn
- **Z-index**: 10000 để hiển thị trên cùng

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

## Storybook

Để xem demo và test các tính năng của toast, chạy:

```bash
npm run storybook
```

Truy cập: `Components/Toast` để xem các stories:
- Basic Toast Types
- Toast với Title
- Toast Positions
- Toast Durations
- Multiple Toasts
- Real World Examples
