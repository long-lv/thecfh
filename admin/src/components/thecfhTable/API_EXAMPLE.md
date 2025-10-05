# ThecfhTable với API Integration

## Cách tích hợp API với ThecfhTable

### 1. **State Management**

```tsx
// States cho table và pagination
const [tableData, setTableData] = useState<any[]>([]);
const [totalCount, setTotalCount] = useState(0);
const [currentPage, setCurrentPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [selectedRows, setSelectedRows] = useState<string[]>([]);
const [tableLoading, setTableLoading] = useState(false);
const [sortField, setSortField] = useState<string>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
```

### 2. **API Function (Backend Sorting)**

```tsx
// API function để fetch data - Backend sẽ handle sorting
const fetchData = async (
  page: number, 
  limit: number, 
  sortField: string, 
  sortDirection: 'asc' | 'desc'
) => {
  setTableLoading(true);
  try {
    // Gửi sort parameters cho backend
    const params = new URLSearchParams({
      page: (page + 1).toString(),  // Backend thường dùng 1-based page
      limit: limit.toString(),
      sort: sortField,              // Field cần sort
      order: sortDirection          // 'asc' hoặc 'desc'
    });
    
    const response = await fetch(`/api/categories?${params}`);
    const result = await response.json();
    
    // Backend đã sort và paginate rồi
    setTableData(result.data);
    setTotalCount(result.total);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error
  } finally {
    setTableLoading(false);
  }
};
```

### 3. **useEffect để load data**

```tsx
useEffect(() => {
  fetchData(currentPage, rowsPerPage, sortField, sortDirection);
}, [currentPage, rowsPerPage, sortField, sortDirection]);
```

### 4. **Event Handlers**

```tsx
// Sort handler
const handleTableSort = (sortConfig: { key: string; direction: 'asc' | 'desc' }) => {
  setSortField(sortConfig.key);
  setSortDirection(sortConfig.direction);
  setCurrentPage(0); // Reset về trang đầu khi sort
};

// Page change handler
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

// Rows per page handler
const handleRowsPerPageChange = (newRowsPerPage: number) => {
  setRowsPerPage(newRowsPerPage);
  setCurrentPage(0); // Reset về trang đầu
};

// Refresh handler
const handleRefresh = () => {
  fetchData(currentPage, rowsPerPage, sortField, sortDirection);
};
```

### 5. **Column Configuration**

```tsx
const tableColumns = [
  {
    id: 'name',
    label: 'Tên danh mục',
    minWidth: 150,
    sortable: true, // Cho phép sort
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 100,
    align: 'center' as const,
    format: (value: string) => (
      <Chip
        label={value}
        color={value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    id: 'actions',
    label: 'Thao tác',
    minWidth: 120,
    align: 'center' as const,
    format: (value: unknown, row: Record<string, unknown>) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton onClick={() => handleEdit(row)}>
          ✏️
        </IconButton>
        <IconButton onClick={() => handleDelete(row)}>
          🗑️
        </IconButton>
      </Box>
    ),
  },
];
```

### 6. **Component Usage**

```tsx
<ThecfhTable
  columns={tableColumns}
  rows={tableData} // Data từ API
  loading={tableLoading} // Loading state
  selectable
  selectedRows={selectedRows}
  onSelectionChange={handleSelectionChange}
  onSort={handleTableSort} // Sort handler
  onRowClick={handleRowClick}
  striped
  hover
  dense
/>

<ThecfhPaginator
  page={currentPage}
  rowsPerPage={rowsPerPage}
  totalRows={totalCount} // Total count từ API
  onPageChange={handlePageChange}
  onRowsPerPageChange={handleRowsPerPageChange}
  rowsPerPageOptions={[10, 25, 50, 100]}
  size="medium"
/>
```

## API Response Format

Backend nên trả về format như sau (đã được sort và paginate):

```json
{
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices",
      "status": "Active",
      "createdAt": "2024-01-15",
      "products": 150
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## Backend API Endpoint Example

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
      db.query(`
        SELECT id, name, description, status, created_at as "createdAt", products_count as products
        FROM categories 
        ORDER BY ${sortField} ${sortDirection}
        LIMIT ${limit} OFFSET ${offset}
      `),
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

## Advanced Features

### Search Integration

```tsx
const [searchTerm, setSearchTerm] = useState('');

const fetchData = async (page, limit, sortField, sortDirection, search) => {
  const params = new URLSearchParams({
    page: (page + 1).toString(),
    limit: limit.toString(),
    sort: sortField,
    order: sortDirection,
    search: search || ''
  });
  
  const response = await fetch(`/api/categories?${params}`);
  // ...
};

useEffect(() => {
  fetchData(currentPage, rowsPerPage, sortField, sortDirection, searchTerm);
}, [currentPage, rowsPerPage, sortField, sortDirection, searchTerm]);
```

### Filter Integration

```tsx
const [filters, setFilters] = useState({
  status: '',
  dateFrom: '',
  dateTo: ''
});

const fetchData = async (page, limit, sortField, sortDirection, filters) => {
  const params = new URLSearchParams({
    page: (page + 1).toString(),
    limit: limit.toString(),
    sort: sortField,
    order: sortDirection,
    ...filters
  });
  
  const response = await fetch(`/api/categories?${params}`);
  // ...
};
```

## Tips

1. **Loading States**: Luôn hiển thị loading state khi fetch data
2. **Error Handling**: Xử lý lỗi API một cách graceful
3. **Optimization**: Sử dụng debounce cho search
4. **Caching**: Cân nhắc cache data để tăng performance
5. **Real-time**: Có thể tích hợp WebSocket cho real-time updates
