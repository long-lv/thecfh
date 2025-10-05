# ThecfhTable với Real API Integration

## Cách tích hợp API thực tế với Backend Sorting

### 1. **API Function thực tế**

```tsx
// Thay thế mock API bằng API call thực tế
const fetchCategoriesAPI = useCallback(async (
  page: number, 
  limit: number, 
  sortField: string, 
  sortDirection: 'asc' | 'desc'
) => {
  try {
    // Tạo query parameters
    const params = new URLSearchParams({
      page: (page + 1).toString(), // Backend thường dùng 1-based page
      limit: limit.toString(),
      sort: sortField,           // Field cần sort
      order: sortDirection       // 'asc' hoặc 'desc'
    });

    // Gọi API
    const response = await fetch(`/api/categories?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Nếu cần auth
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      data: result.data,           // Array of records
      total: result.total,         // Total count
      page: result.page,           // Current page
      limit: result.limit,         // Records per page
      totalPages: result.totalPages // Total pages
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}, []);
```

### 2. **Backend API Endpoint**

```javascript
// Express.js example
app.get('/api/categories', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'name', order = 'asc' } = req.query;
    
    // Validate sort field (security)
    const allowedSortFields = ['name', 'createdAt', 'products', 'status'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'name';
    const sortDirection = order === 'desc' ? 'DESC' : 'ASC';
    
    // Database query với sorting và pagination
    const offset = (page - 1) * limit;
    
    const [data, totalCount] = await Promise.all([
      // Get paginated data
      db.query(`
        SELECT id, name, description, status, created_at as "createdAt", products_count as products
        FROM categories 
        ORDER BY ${sortField} ${sortDirection}
        LIMIT ${limit} OFFSET ${offset}
      `),
      
      // Get total count
      db.query('SELECT COUNT(*) as count FROM categories')
    ]);
    
    res.json({
      data: data.rows,
      total: parseInt(totalCount.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### 3. **Advanced API với Search và Filters**

```tsx
const fetchCategoriesAPI = useCallback(async (
  page: number,
  limit: number,
  sortField: string,
  sortDirection: 'asc' | 'desc',
  searchTerm?: string,
  filters?: Record<string, any>
) => {
  try {
    const params = new URLSearchParams({
      page: (page + 1).toString(),
      limit: limit.toString(),
      sort: sortField,
      order: sortDirection,
    });

    // Add search
    if (searchTerm) {
      params.append('search', searchTerm);
    }

    // Add filters
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.append('dateTo', filters.dateTo);
    }

    const response = await fetch(`/api/categories?${params}`);
    const result = await response.json();
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}, []);
```

### 4. **State Management với Search và Filters**

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [filters, setFilters] = useState({
  status: '',
  dateFrom: '',
  dateTo: ''
});

// Debounced search
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// Update fetch function
const fetchCategories = useCallback(async () => {
  setTableLoading(true);
  try {
    const response = await fetchCategoriesAPI(
      currentPage, 
      rowsPerPage, 
      sortField, 
      sortDirection,
      debouncedSearchTerm,
      filters
    );
    setTableData(response.data);
    setTotalCount(response.total);
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    setTableLoading(false);
  }
}, [currentPage, rowsPerPage, sortField, sortDirection, debouncedSearchTerm, filters]);

// Load data when dependencies change
useEffect(() => {
  fetchCategories();
}, [fetchCategories]);
```

### 5. **Search Component Integration**

```tsx
// Search input
<ThecfhInput
  placeholder="Tìm kiếm danh mục..."
  value={searchTerm}
  onChange={setSearchTerm}
  width="300px"
/>

// Filter dropdown
<ThecfhSelect
  options={[
    { label: 'Tất cả', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ]}
  value={filters.status}
  onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
/>
```

### 6. **Error Handling và Loading States**

```tsx
const [error, setError] = useState<string | null>(null);

const fetchCategories = useCallback(async () => {
  setTableLoading(true);
  setError(null);
  
  try {
    const response = await fetchCategoriesAPI(
      currentPage, 
      rowsPerPage, 
      sortField, 
      sortDirection
    );
    setTableData(response.data);
    setTotalCount(response.total);
  } catch (error) {
    setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    console.error('Error fetching categories:', error);
  } finally {
    setTableLoading(false);
  }
}, [currentPage, rowsPerPage, sortField, sortDirection]);

// Error display
{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {error}
  </Alert>
)}
```

### 7. **Optimistic Updates**

```tsx
const handleDeleteCategory = async (categoryId: string) => {
  try {
    // Optimistic update - remove from UI immediately
    setTableData(prev => prev.filter(item => item.id !== categoryId));
    setTotalCount(prev => prev - 1);
    
    // Call API
    await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
    
    // Refresh data to ensure consistency
    fetchCategories();
  } catch (error) {
    // Revert optimistic update on error
    fetchCategories();
    alert('Không thể xóa danh mục. Vui lòng thử lại.');
  }
};
```

### 8. **Caching với React Query**

```tsx
import { useQuery } from '@tanstack/react-query';

const useCategories = (page: number, limit: number, sortField: string, sortDirection: 'asc' | 'desc') => {
  return useQuery({
    queryKey: ['categories', page, limit, sortField, sortDirection],
    queryFn: () => fetchCategoriesAPI(page, limit, sortField, sortDirection),
    keepPreviousData: true, // Keep previous data while fetching new
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Usage in component
const { data, isLoading, error } = useCategories(currentPage, rowsPerPage, sortField, sortDirection);
```

## Backend Best Practices

### 1. **SQL Injection Prevention**
```javascript
// Use parameterized queries
const query = `
  SELECT * FROM categories 
  WHERE name ILIKE $1 
  ORDER BY $2 $3 
  LIMIT $4 OFFSET $5
`;
const values = [`%${searchTerm}%`, sortField, sortDirection, limit, offset];
```

### 2. **Field Validation**
```javascript
const allowedSortFields = ['name', 'createdAt', 'products', 'status'];
const sortField = allowedSortFields.includes(sort) ? sort : 'name';
```

### 3. **Pagination Limits**
```javascript
const limit = Math.min(Math.max(parseInt(limit) || 10, 1), 100); // Min 1, Max 100
```

### 4. **Response Format**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10,
  "hasNextPage": true,
  "hasPrevPage": false
}
```
