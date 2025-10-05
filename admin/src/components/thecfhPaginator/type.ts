export interface IPropsThecfhPaginator {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
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
