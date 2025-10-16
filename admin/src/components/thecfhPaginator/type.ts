export interface IPropsThecfhPaginator {
  page: number; // 1-based page number (1, 2, 3, ...)
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void; // Receives 1-based page number
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showRowsPerPage?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  labelRowsPerPage?: string;
  labelDisplayedRows?: (from: number, to: number, count: number) => string;
  size?: 'small' | 'medium';
}
