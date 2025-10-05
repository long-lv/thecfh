import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from '../../contexts/ToastContext';
import { Button, Box, Typography } from '@mui/material';
import React from 'react';

// Toast Demo Component
const ToastDemo = () => {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast.success('Dữ liệu đã được lưu thành công!');
  };

  const handleError = () => {
    toast.error('Có lỗi xảy ra khi lưu dữ liệu!');
  };

  const handleWarning = () => {
    toast.warning('Vui lòng kiểm tra lại thông tin!');
  };

  const handleInfo = () => {
    toast.info('Thông tin mới đã được cập nhật!');
  };

  const handleSuccessWithTitle = () => {
    toast.success('Đăng nhập thành công!', {
      title: 'Chào mừng bạn quay trở lại',
      duration: 5000,
    });
  };

  const handleErrorWithTitle = () => {
    toast.error('Không thể kết nối đến server!', {
      title: 'Lỗi kết nối',
      duration: 6000,
    });
  };

  const handleWarningWithTitle = () => {
    toast.warning('Tài khoản của bạn sắp hết hạn!', {
      title: 'Cảnh báo quan trọng',
      duration: 8000,
    });
  };

  const handleInfoWithTitle = () => {
    toast.info('Có 3 thông báo mới!', {
      title: 'Thông báo',
      duration: 4000,
    });
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Toast Notifications Demo
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button variant="contained" color="success" onClick={handleSuccess}>
          Success Toast
        </Button>
        <Button variant="contained" color="error" onClick={handleError}>
          Error Toast
        </Button>
        <Button variant="contained" color="warning" onClick={handleWarning}>
          Warning Toast
        </Button>
        <Button variant="contained" color="info" onClick={handleInfo}>
          Info Toast
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Toast với Title
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button variant="outlined" color="success" onClick={handleSuccessWithTitle}>
          Success với Title
        </Button>
        <Button variant="outlined" color="error" onClick={handleErrorWithTitle}>
          Error với Title
        </Button>
        <Button variant="outlined" color="warning" onClick={handleWarningWithTitle}>
          Warning với Title
        </Button>
        <Button variant="outlined" color="info" onClick={handleInfoWithTitle}>
          Info với Title
        </Button>
      </Box>
    </Box>
  );
};

// Wrapper component with ToastProvider
const ToastDemoWrapper = () => (
  <ToastProvider>
    <ToastDemo />
  </ToastProvider>
);

const meta: Meta<typeof ToastDemoWrapper> = {
  title: 'Components/Toast',
  component: ToastDemoWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Toast Notifications

Toast notifications là một hệ thống thông báo hiện đại và linh hoạt cho ứng dụng. Hỗ trợ 4 loại thông báo và 6 vị trí hiển thị khác nhau.

## Features

- ✅ **4 Toast Types**: success, error, warning, info
- ✅ **6 Positions**: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right  
- ✅ **Custom Options**: title, duration, position, closable
- ✅ **Auto-close**: với thời gian tùy chỉnh
- ✅ **Stack toasts**: hiển thị nhiều toast cùng lúc
- ✅ **Smooth animations**: và styling đẹp

## Usage

\`\`\`tsx
import { useGlobalToast } from '@/src/hooks/useGlobalToast';

const { success, error, warning, info } = useGlobalToast();

// Basic usage
success('Thành công!');
error('Có lỗi!');

// Advanced usage
success('Đăng nhập thành công!', {
  title: 'Chào mừng bạn',
  position: 'top-center',
  duration: 5000,
});
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic Toast Types',
  parameters: {
    docs: {
      description: {
        story: 'Các loại toast cơ bản: success, error, warning, info',
      },
    },
  },
};

export const WithTitles: Story = {
  name: 'Toast với Title',
  parameters: {
    docs: {
      description: {
        story: 'Toast với title để làm nổi bật thông báo quan trọng',
      },
    },
  },
};

// Position Demo Component
const PositionDemo = () => {
  const { toast } = useToast();

  const positions = [
    'top-left',
    'top-center', 
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ] as const;

  const handleShowToast = (position: typeof positions[number]) => {
    toast.info(`Toast hiển thị ở ${position}`, {
      position,
      duration: 4000,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Toast Positions Demo
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Click vào các button để xem toast hiển thị ở các vị trí khác nhau
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {positions.map((position) => (
          <Button
            key={position}
            variant="outlined"
            onClick={() => handleShowToast(position)}
            sx={{ textTransform: 'none' }}
          >
            {position}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

const PositionDemoWrapper = () => (
  <ToastProvider>
    <PositionDemo />
  </ToastProvider>
);

export const Positions: Story = {
  name: 'Toast Positions',
  render: () => <PositionDemoWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Demo các vị trí hiển thị toast khác nhau',
      },
    },
  },
};

// Duration Demo Component
const DurationDemo = () => {
  const { toast } = useToast();

  const durations = [1000, 2000, 4000, 6000, 0]; // 0 means no auto-close

  const handleShowToast = (duration: number) => {
    toast.info(`Toast hiển thị ${duration === 0 ? 'không tự đóng' : `${duration}ms`}`, {
      duration,
      title: `Duration: ${duration === 0 ? 'No auto-close' : `${duration}ms`}`,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Toast Duration Demo
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Click vào các button để xem toast với thời gian hiển thị khác nhau
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {durations.map((duration) => (
          <Button
            key={duration}
            variant="outlined"
            onClick={() => handleShowToast(duration)}
          >
            {duration === 0 ? 'No auto-close' : `${duration}ms`}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

const DurationDemoWrapper = () => (
  <ToastProvider>
    <DurationDemo />
  </ToastProvider>
);

export const Durations: Story = {
  name: 'Toast Durations',
  render: () => <DurationDemoWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Demo các thời gian hiển thị toast khác nhau',
      },
    },
  },
};

// Multiple Toasts Demo
const MultipleToastsDemo = () => {
  const { toast } = useToast();

  const handleShowMultiple = () => {
    toast.success('Toast 1: Thành công!');
    setTimeout(() => toast.error('Toast 2: Có lỗi!'), 500);
    setTimeout(() => toast.warning('Toast 3: Cảnh báo!'), 1000);
    setTimeout(() => toast.info('Toast 4: Thông tin!'), 1500);
  };

  const handleShowMultipleWithSameType = () => {
    toast.success('Dữ liệu đã được lưu!');
    setTimeout(() => toast.success('File đã được tải lên!'), 300);
    setTimeout(() => toast.success('Email đã được gửi!'), 600);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Multiple Toasts Demo
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Demo hiển thị nhiều toast cùng lúc
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={handleShowMultiple}>
          Show Multiple Different Types
        </Button>
        <Button variant="outlined" onClick={handleShowMultipleWithSameType}>
          Show Multiple Same Type
        </Button>
      </Box>
    </Box>
  );
};

const MultipleToastsDemoWrapper = () => (
  <ToastProvider>
    <MultipleToastsDemo />
  </ToastProvider>
);

export const MultipleToasts: Story = {
  name: 'Multiple Toasts',
  render: () => <MultipleToastsDemoWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Demo hiển thị nhiều toast cùng lúc với các loại khác nhau',
      },
    },
  },
};

// Real World Examples
const RealWorldDemo = () => {
  const { toast } = useToast();

  const handleLogin = () => {
    toast.success('Đăng nhập thành công!', {
      title: 'Chào mừng bạn quay trở lại',
      duration: 5000,
    });
  };

  const handleLogout = () => {
    toast.info('Bạn đã đăng xuất thành công', {
      duration: 3000,
    });
  };

  const handleSaveData = () => {
    toast.success('Dữ liệu đã được lưu thành công!', {
      title: 'Lưu thành công',
      duration: 4000,
    });
  };

  const handleSaveError = () => {
    toast.error('Không thể lưu dữ liệu!', {
      title: 'Lỗi lưu dữ liệu',
      duration: 6000,
    });
  };

  const handleFileUpload = () => {
    toast.success('File đã được tải lên thành công!', {
      title: 'Upload thành công',
      duration: 4000,
    });
  };

  const handleFileUploadError = () => {
    toast.error('Không thể tải file lên server!', {
      title: 'Upload thất bại',
      duration: 6000,
    });
  };

  const handleValidationError = () => {
    toast.warning('Vui lòng kiểm tra lại thông tin!', {
      title: 'Dữ liệu không hợp lệ',
      duration: 5000,
    });
  };

  const handleNewNotification = () => {
    toast.info('Bạn có 3 thông báo mới!', {
      title: 'Thông báo',
      duration: 4000,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Real World Examples
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Các ví dụ thực tế về cách sử dụng toast trong ứng dụng
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <Button variant="contained" color="success" onClick={handleLogin}>
          Login Success
        </Button>
        <Button variant="outlined" color="info" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="contained" color="success" onClick={handleSaveData}>
          Save Data Success
        </Button>
        <Button variant="contained" color="error" onClick={handleSaveError}>
          Save Data Error
        </Button>
        <Button variant="contained" color="success" onClick={handleFileUpload}>
          File Upload Success
        </Button>
        <Button variant="contained" color="error" onClick={handleFileUploadError}>
          File Upload Error
        </Button>
        <Button variant="contained" color="warning" onClick={handleValidationError}>
          Validation Error
        </Button>
        <Button variant="contained" color="info" onClick={handleNewNotification}>
          New Notification
        </Button>
      </Box>
    </Box>
  );
};

const RealWorldDemoWrapper = () => (
  <ToastProvider>
    <RealWorldDemo />
  </ToastProvider>
);

export const RealWorldExamples: Story = {
  name: 'Real World Examples',
  render: () => <RealWorldDemoWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Các ví dụ thực tế về cách sử dụng toast trong các tình huống khác nhau của ứng dụng',
      },
    },
  },
};
