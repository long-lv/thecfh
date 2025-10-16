"use client";
import ThecfhButton from "@/src/components/thecfhButton";
import ThecfhCalender from "@/src/components/thecfhCalender";
import { ThecfhCheckbox } from "@/src/components/thecfhCheckbox";
import ThecfhDialog from "@/src/components/thecfhDialog";
import ThecfhInput from "@/src/components/thecfhInput";
import ThecfhPaginator from "@/src/components/thecfhPaginator";
import ThecfhSelect from "@/src/components/thecfhSelect";
import ThecfhTable from "@/src/components/thecfhTable";
import ThecfhTooltip from "@/src/components/thecfhTolltip";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { useUserStore } from "@/src/stores";
import { api, ApiError, NetworkError, RefreshTokenError } from "@/src/utils/apiUtil";
import { Box, Chip, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const DemoPage = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const { success, error, warning, info } = useGlobalToast();
    const user = useUserStore((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];
  const [selectValue, setSelectValue] = useState("1");
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    dayjs('2022-04-17').toDate(),
    dayjs('2022-04-21').toDate(),
  ]);

    useEffect(() => {
        console.log(user, 'user save zustand')
    }, [user])
  
  // Dialog states
  const [basicDialogOpen, setBasicDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [customWidthDialogOpen, setCustomWidthDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
  });

  // Table and Pagination states
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // JSONPlaceholder API test states
  const [jsonPlaceholderData, setJsonPlaceholderData] = useState<unknown[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const renderTitleTooltip = () => {
    return (
      <p className="text-red-500">
        Tooltip test
      </p>
    );
  };
  
  useEffect(() => {
    console.log(checkboxValue);
  }, [checkboxValue]);

  // Mock data - move outside component for better performance
  const getMockData = useCallback(() => [
    { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', status: 'Active', createdAt: '2024-01-15', products: 150 },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel items', status: 'Active', createdAt: '2024-01-14', products: 89 },
    { id: 3, name: 'Books', description: 'Books and educational materials', status: 'Inactive', createdAt: '2024-01-13', products: 234 },
    { id: 4, name: 'Home & Garden', description: 'Home improvement and garden supplies', status: 'Active', createdAt: '2024-01-12', products: 67 },
    { id: 5, name: 'Sports', description: 'Sports equipment and accessories', status: 'Active', createdAt: '2024-01-11', products: 123 },
    { id: 6, name: 'Toys', description: 'Toys and games for children', status: 'Active', createdAt: '2024-01-10', products: 45 },
    { id: 7, name: 'Beauty', description: 'Beauty and personal care products', status: 'Active', createdAt: '2024-01-09', products: 78 },
    { id: 8, name: 'Automotive', description: 'Car parts and accessories', status: 'Inactive', createdAt: '2024-01-08', products: 34 },
    { id: 9, name: 'Health', description: 'Health and wellness products', status: 'Active', createdAt: '2024-01-07', products: 56 },
    { id: 10, name: 'Office', description: 'Office supplies and equipment', status: 'Active', createdAt: '2024-01-06', products: 92 },
    { id: 11, name: 'Garden', description: 'Garden tools and plants', status: 'Inactive', createdAt: '2024-01-05', products: 34 },
    { id: 12, name: 'Kitchen', description: 'Kitchen appliances and tools', status: 'Active', createdAt: '2024-01-04', products: 78 },
  ], []);

  // Mock API function - replace with your actual API call
  const fetchCategoriesAPI = useCallback(async (page: number, limit: number, sortField: string, sortDirection: 'asc' | 'desc') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API call với sort parameters
    console.log('API Call with params:', {
      page: page + 1,
      limit,
      sort: sortField,
      order: sortDirection
    });
    
    // Mock response từ backend (backend đã sort rồi)
    const mockData = getMockData();
    
    // Simulate backend sorting (trong thực tế, backend sẽ làm việc này)
    const sortedData = [...mockData].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Simulate backend pagination
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: mockData.length,
      page: page + 1,
      limit,
      totalPages: Math.ceil(mockData.length / limit)
    };
  }, [getMockData]);

  // API Functions
  const fetchCategories = useCallback(async (page: number, limit: number, sortField: string, sortDirection: 'asc' | 'desc') => {
    setTableLoading(true);
    try {
      // Simulate API call - replace with your actual API
      const response = await fetchCategoriesAPI(page, limit, sortField, sortDirection);
      setTableData(response.data);
      setTotalCount(response.total);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to mock data
      setTableData(getMockData());
      setTotalCount(getMockData().length);
    } finally {
      setTableLoading(false);
    }
  }, [fetchCategoriesAPI, getMockData]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchCategories(currentPage, rowsPerPage, sortField, sortDirection);
  }, [currentPage, rowsPerPage, sortField, sortDirection, fetchCategories]);

  // Dialog handlers
  const handleConfirm = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setConfirmDialogOpen(false);
    alert('Đã xác nhận thành công!');
  };

  const handleFormSubmit = () => {
    alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
    setFormDialogOpen(false);
    setFormData({ categoryName: '', description: '' });
  };

  // Table handlers
  const handleTableSort = (sortConfig: { key: string; direction: 'asc' | 'desc' }) => {
    setSortField(sortConfig.key);
    setSortDirection(sortConfig.direction);
    setCurrentPage(0); // Reset to first page when sorting
  };

  const handleRowClick = (row: Record<string, unknown>) => {
    alert(`Clicked row: ${(row as { name: string }).name}`);
  };

  const handleSelectionChange = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0); // Reset to first page
  };

  const handleRefresh = () => {
    fetchCategories(currentPage, rowsPerPage, sortField, sortDirection);
  };

  // Demo functions for global loading
  const handleShowLoading = () => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  const handleShowLoadingWithMessage = () => {
    showLoading('Đang xử lý yêu cầu của bạn...');
    setTimeout(() => {
      hideLoading();
    }, 2000);
  };

  // Demo functions for toast
  const handleShowSuccessToast = () => {
    success('Dữ liệu đã được lưu thành công!');
  };

  const handleShowErrorToast = () => {
    error('Có lỗi xảy ra khi lưu dữ liệu!');
  };

  const handleShowWarningToast = () => {
    warning('Vui lòng kiểm tra lại thông tin trước khi tiếp tục!');
  };

  const handleShowInfoToast = () => {
    info('Thông tin mới đã được cập nhật!');
  };

  const handleShowToastWithTitle = () => {
    success('Đăng nhập thành công!', {
      title: 'Chào mừng bạn quay trở lại',
      duration: 5000,
    });
  };

  const handleShowToastWithPosition = () => {
    info('Toast hiển thị ở góc dưới bên trái!', {
      position: 'bottom-left',
      duration: 6000,
    });
  };

  // JSONPlaceholder API test functions
  const testJsonPlaceholderAPI = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing JSONPlaceholder API...');
      
      // Test GET request to JSONPlaceholder
      const response = await api.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      console.log('✅ JSONPlaceholder GET Response:', response);
      const data = response.data as unknown[];
      setJsonPlaceholderData(data);
      success(`Đã lấy ${data.length} posts từ JSONPlaceholder!`);
      
    } catch (err) {
      console.error('❌ JSONPlaceholder API Error:', err);
      error('Lỗi khi gọi API JSONPlaceholder!');
    } finally {
      setApiLoading(false);
    }
  };

  const testJsonPlaceholderPOST = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing JSONPlaceholder POST...');
      
      const newPost = {
        title: 'Test Post từ Admin Panel',
        body: 'Đây là test post từ API utility',
        userId: 1
      };
      
      const response = await api.post('https://jsonplaceholder.typicode.com/posts', newPost);
      console.log('✅ JSONPlaceholder POST Response:', response);
      success('Đã tạo post mới thành công!');
      
    } catch (err) {
      console.error('❌ JSONPlaceholder POST Error:', err);
      error('Lỗi khi tạo post mới!');
    } finally {
      setApiLoading(false);
    }
  };

  const testJsonPlaceholderPUT = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing JSONPlaceholder PUT...');
      
      const updatedPost = {
        id: 1,
        title: 'Updated Post từ Admin Panel',
        body: 'Đây là post đã được cập nhật',
        userId: 1
      };
      
      const response = await api.put('https://jsonplaceholder.typicode.com/posts/1', updatedPost);
      console.log('✅ JSONPlaceholder PUT Response:', response);
      success('Đã cập nhật post thành công!');
      
    } catch (err) {
      console.error('❌ JSONPlaceholder PUT Error:', err);
      error('Lỗi khi cập nhật post!');
    } finally {
      setApiLoading(false);
    }
  };

  const testJsonPlaceholderDELETE = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing JSONPlaceholder DELETE...');
      
      const response = await api.delete('https://jsonplaceholder.typicode.com/posts/1');
      console.log('✅ JSONPlaceholder DELETE Response:', response);
      success('Đã xóa post thành công!');
      
    } catch (err) {
      console.error('❌ JSONPlaceholder DELETE Error:', err);
      error('Lỗi khi xóa post!');
    } finally {
      setApiLoading(false);
    }
  };

  // Test function to check token
  const testTokenCheck = () => {
    console.log('🔍 Testing Token Check...');
    console.log('📋 Check console logs above to see token details');
    info('Kiểm tra console để xem chi tiết Bearer token!');
  };

  // Test request cancellation
  const testRequestCancellation = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing Request Cancellation...');
      
      // Start a long request
      const longRequest = api.get('https://jsonplaceholder.typicode.com/posts?_delay=5000', {
        requestId: 'long-request'
      });
      
      // Cancel after 2 seconds
      setTimeout(() => {
        api.cancel('long-request');
        console.log('🚫 Request canceled after 2 seconds');
        success('Request đã được hủy thành công!');
        setApiLoading(false);
      }, 2000);
      
      await longRequest;
    } catch (err) {
      if (err instanceof ApiError && err.isCanceled) {
        console.log('✅ Request was successfully canceled');
      } else {
        console.error('❌ Request cancellation error:', err);
        error('Lỗi khi hủy request!');
      }
      setApiLoading(false);
    }
  };

  // Test error handling
  const testErrorHandling = async () => {
    setApiLoading(true);
    try {
      console.log('🧪 Testing Error Handling...');
      
      // Test different error types
      await api.get('https://httpstat.us/404'); // 404 error
    } catch (err) {
      if (err instanceof ApiError) {
        console.log('✅ Caught ApiError:', {
          message: err.message,
          status: err.status,
          isNetworkError: err.isNetworkError,
          isTimeoutError: err.isTimeoutError,
          isCanceled: err.isCanceled
        });
        
        if (err.status === 404) {
          warning('Resource not found (404)');
        } else if (err.isNetworkError) {
          error('Network error occurred');
        } else {
          error(`API Error: ${err.message}`);
        }
      } else if (err instanceof RefreshTokenError) {
        error('Session expired. Please login again.');
      } else if (err instanceof NetworkError) {
        error('Network connection failed');
      } else {
        error('Unknown error occurred');
      }
    } finally {
      setApiLoading(false);
    }
  };

  // Table columns configuration
  const tableColumns = [
    {
      id: 'name',
      label: 'Tên danh mục',
      minWidth: 150,
      sortable: true,
    },
    {
      id: 'description',
      label: 'Mô tả',
      minWidth: 200,
      sortable: true,
    },
    {
      id: 'status',
      label: 'Trạng thái',
      minWidth: 100,
      align: 'center' as const,
      format: (value: unknown) => (
        <Chip
          label={value as string}
          color={(value as string) === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      id: 'products',
      label: 'Số sản phẩm',
      minWidth: 120,
      align: 'right' as const,
      sortable: true,
      format: (value: unknown) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {value as number}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            items
          </Typography>
        </Box>
      ),
    },
    {
      id: 'createdAt',
      label: 'Ngày tạo',
      minWidth: 120,
      align: 'center' as const,
      format: (value: unknown) => dayjs(value as string).format('DD/MM/YYYY'),
      sortable: true,
    },
    {
      id: 'actions',
      label: 'Thao tác',
      minWidth: 120,
      align: 'center' as const,
      format: (value: unknown, row?: Record<string, unknown>) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <Tooltip title="Chỉnh sửa">
            <IconButton 
              size="small" 
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Edit: ${(row as { name: string })?.name}`);
              }}
            >
              ✏️
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton 
              size="small" 
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Delete: ${(row as { name: string })?.name}`);
              }}
            >
              🗑️
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  // No need to calculate paginated data - API handles pagination

  return (
    <div>
      <h1>Categories</h1>
      
      {/* Demo Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Component Demo
        </Typography>
        <div style={{ width: "500px" }}>
        <ThecfhInput
          placeholder="Search"
          value={inputValue}
          onChange={setInputValue}
          width="500px"
        />
        <ThecfhButton
          label="Search"
          width="100px"
          height="40px"
          onClick={() => {}}
          style={{ color: "var(--color-gray-text-input)"}}
        />
        <ThecfhSelect
          options={options}
          value={selectValue}
          onChange={setSelectValue}
        />
        <ThecfhTooltip
          title={renderTitleTooltip()}
          description="Tooltip description"
        />
        <ThecfhCheckbox value={checkboxValue} onChange={setCheckboxValue} />
        <ThecfhCalender
            value={selectedDate}
            format="dd/MM/yyyy"
            minDate={new Date('1900-01-01')}
            disabled={false}
            onChange={(date) => setSelectedDate(date)}
          />
        <ThecfhCalender
          mode="range"
          valueRange={dateRange}
          onRangeChange={setDateRange}
        />
        
        {/* Dialog Demo Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <ThecfhButton
            label="Mở Dialog Cơ Bản"
            width="150px"
            height="40px"
            onClick={() => setBasicDialogOpen(true)}
          />
          <ThecfhButton
            label="Dialog Xác Nhận"
            width="150px"
            height="40px"
            onClick={() => setConfirmDialogOpen(true)}
            style={{ backgroundColor: '#ff9800', color: 'white' }}
          />
          <ThecfhButton
            label="Dialog Form"
            width="150px"
            height="40px"
            onClick={() => setFormDialogOpen(true)}
            style={{ backgroundColor: '#4caf50', color: 'white' }}
          />
          <ThecfhButton
            label="Custom Width"
            width="150px"
            height="40px"
            onClick={() => setCustomWidthDialogOpen(true)}
            style={{ backgroundColor: '#9c27b0', color: 'white' }}
          />
        </Box>
        </div>
      </Box>

      {/* Table Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          ThecfhTable & ThecfhPaginator Demo
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <ThecfhButton
            label="Refresh Table"
            width="120px"
            height="40px"
            onClick={handleRefresh}
          />
          <ThecfhButton
            label={`Selected: ${selectedRows.length}`}
            width="120px"
            height="40px"
            onClick={() => alert(`Selected rows: ${selectedRows.join(', ')}`)}
            disabled={selectedRows.length === 0}
          />
        </Box>
        
        {/* Global Loading Demo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Global Loading Demo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <ThecfhButton
              label="Show Loading (3s)"
              width="160px"
              height="40px"
              onClick={handleShowLoading}
              style={{ backgroundColor: '#2196f3', color: 'white' }}
            />
            <ThecfhButton
              label="Custom Message (2s)"
              width="160px"
              height="40px"
              onClick={handleShowLoadingWithMessage}
              style={{ backgroundColor: '#ff5722', color: 'white' }}
            />
          </Box>
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              💡 Sử dụng: <code>showLoading(&apos;message&apos;)</code> và <code>hideLoading()</code>
            </Typography>
          </Box>
        </Box>

        {/* API Test Demo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            API Utility Test (JSONPlaceholder)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <ThecfhButton
              label="Test GET API"
              width="120px"
              height="40px"
              onClick={testJsonPlaceholderAPI}
              disabled={apiLoading}
              style={{ backgroundColor: '#4caf50', color: 'white' }}
            />
            <ThecfhButton
              label="Test POST API"
              width="120px"
              height="40px"
              onClick={testJsonPlaceholderPOST}
              disabled={apiLoading}
              style={{ backgroundColor: '#2196f3', color: 'white' }}
            />
            <ThecfhButton
              label="Test PUT API"
              width="120px"
              height="40px"
              onClick={testJsonPlaceholderPUT}
              disabled={apiLoading}
              style={{ backgroundColor: '#ff9800', color: 'white' }}
            />
            <ThecfhButton
              label="Test DELETE API"
              width="120px"
              height="40px"
              onClick={testJsonPlaceholderDELETE}
              disabled={apiLoading}
              style={{ backgroundColor: '#f44336', color: 'white' }}
            />
            <ThecfhButton
              label="Check Token"
              width="120px"
              height="40px"
              onClick={testTokenCheck}
              style={{ backgroundColor: '#9c27b0', color: 'white' }}
            />
            <ThecfhButton
              label="Test Cancel"
              width="120px"
              height="40px"
              onClick={testRequestCancellation}
              disabled={apiLoading}
              style={{ backgroundColor: '#ff5722', color: 'white' }}
            />
            <ThecfhButton
              label="Test Errors"
              width="120px"
              height="40px"
              onClick={testErrorHandling}
              disabled={apiLoading}
              style={{ backgroundColor: '#795548', color: 'white' }}
            />
          </Box>
          
          {apiLoading && (
            <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="primary">
                🔄 Đang gọi API... Vui lòng chờ
              </Typography>
            </Box>
          )}
          
          {jsonPlaceholderData.length > 0 && (
            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                📋 Dữ liệu từ JSONPlaceholder:
              </Typography>
              {jsonPlaceholderData.map((post: unknown, index: number) => {
                const postData = post as { id: number; title: string; userId: number };
                return (
                <Box key={postData.id} sx={{ mb: 1, p: 1, backgroundColor: 'white', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {index + 1}. {postData.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ID: {postData.id} | User ID: {postData.userId}
                  </Typography>
                </Box>
                );
              })}
            </Box>
          )}
          
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              💡 Test API utility với JSONPlaceholder - Kiểm tra console để xem chi tiết request/response
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              🔐 Bearer token sẽ được tự động thêm vào mọi request - Xem console logs để kiểm tra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              🚫 Request cancellation, error handling, và token refresh đã được implement
            </Typography>
          </Box>
        </Box>

        {/* Toast Demo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Toast Notifications Demo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <ThecfhButton
              label="Success Toast"
              width="120px"
              height="40px"
              onClick={handleShowSuccessToast}
              style={{ backgroundColor: '#4caf50', color: 'white' }}
            />
            <ThecfhButton
              label="Error Toast"
              width="120px"
              height="40px"
              onClick={handleShowErrorToast}
              style={{ backgroundColor: '#f44336', color: 'white' }}
            />
            <ThecfhButton
              label="Warning Toast"
              width="120px"
              height="40px"
              onClick={handleShowWarningToast}
              style={{ backgroundColor: '#ff9800', color: 'white' }}
            />
            <ThecfhButton
              label="Info Toast"
              width="120px"
              height="40px"
              onClick={handleShowInfoToast}
              style={{ backgroundColor: '#2196f3', color: 'white' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <ThecfhButton
              label="Toast with Title"
              width="140px"
              height="40px"
              onClick={handleShowToastWithTitle}
              style={{ backgroundColor: '#9c27b0', color: 'white' }}
            />
            <ThecfhButton
              label="Custom Position"
              width="140px"
              height="40px"
              onClick={handleShowToastWithPosition}
              style={{ backgroundColor: '#607d8b', color: 'white' }}
            />
          </Box>
          
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              💡 Sử dụng: <code>toast.success(&apos;message&apos;)</code>, <code>toast.error()</code>, <code>toast.warning()</code>, <code>toast.info()</code>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              📍 Vị trí: <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>bottom-right</code>
            </Typography>
          </Box>
        </Box>
        
        <ThecfhTable
          columns={tableColumns}
          data={tableData}
          loading={tableLoading}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
          onSort={handleTableSort}
          onRowClick={handleRowClick}
          striped
          hover
          dense
        />
        
        <ThecfhPaginator
          page={currentPage}
          rowsPerPage={rowsPerPage}
          totalRows={totalCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[3, 5, 10, 25]}
          size="medium"
        />
      </Box>

      {/* Basic Dialog */}
      <ThecfhDialog
        open={basicDialogOpen}
        onClose={() => setBasicDialogOpen(false)}
        title="Dialog Cơ Bản"
        maxWidth="sm"
        width="600px"
      >
        <Typography>
          Đây là một dialog cơ bản để demo component ThecfhDialog.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Dialog này sử dụng Material UI làm base và có thể tùy chỉnh theo ý muốn.
        </Typography>
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            💡 Bạn có thể thêm bất kỳ nội dung nào vào đây
          </Typography>
        </Box>
      </ThecfhDialog>

      {/* Confirm Dialog */}
      <ThecfhDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Xác Nhận Hành Động"
        maxWidth="xs"
        confirmButton
        confirmButtonText="Ok"
        onConfirm={handleConfirm}
        loading={loading}
        disableBackdropClick
        closeButtonText="Cancel"
      >
        <Typography>
          Bạn có chắc chắn muốn thực hiện hành động này không?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ⚠️ Hành động này không thể hoàn tác.
        </Typography>
      </ThecfhDialog>

      {/* Form Dialog */}
      <ThecfhDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        title="Thêm Danh Mục Mới"
        maxWidth="md"
        confirmButton
        confirmButtonText="Lưu"
        onConfirm={handleFormSubmit}
        closeButtonText="Hủy"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Tên danh mục"
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            fullWidth
            variant="outlined"
            placeholder="Nhập tên danh mục..."
          />
          <TextField
            label="Mô tả"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            placeholder="Nhập mô tả cho danh mục..."
          />
          <Box sx={{ mt: 1, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="body2" color="primary">
              ℹ️ Điền đầy đủ thông tin để tạo danh mục mới
            </Typography>
          </Box>
        </Box>
      </ThecfhDialog>

      {/* Custom Width Dialog */}
      <ThecfhDialog
        open={customWidthDialogOpen}
        onClose={() => setCustomWidthDialogOpen(false)}
        title="Dialog với Custom Width"
        width="500px"
        confirmButton
        confirmButtonText="OK"
        onConfirm={() => setCustomWidthDialogOpen(false)}
        closeButtonText="Đóng"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Demo Custom Width Dialog
          </Typography>
          <Typography variant="body1" paragraph>
            Dialog này có width cố định là <strong>800px</strong> thay vì sử dụng maxWidth.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Khi bạn truyền prop <code>width</code>, component sẽ:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2">
              Disable <code>maxWidth</code> và <code>fullWidth</code>
            </Typography>
            <Typography component="li" variant="body2">
              Áp dụng width cố định từ style
            </Typography>
            <Typography component="li" variant="body2">
              Responsive trên mobile vẫn hoạt động bình thường
            </Typography>
          </Box>
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2">
              💡 <strong>Usage:</strong> <code>width=&quot;800px&quot;</code> hoặc <code>width=&quot;50vw&quot;</code>
            </Typography>
          </Box>
        </Box>
      </ThecfhDialog>
    </div>
  );
};

export default DemoPage;
