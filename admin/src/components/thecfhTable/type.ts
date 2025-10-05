import { ReactNode } from 'react';

export interface IColumn<T = Record<string, unknown>> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: unknown, row?: T) => string | ReactNode;
  sortable?: boolean;
  searchable?: boolean;
}

export interface ISortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface IPropsThecfhTable<T = Record<string, unknown>> {
  columns: IColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  maxHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  onSort?: (sortConfig: ISortConfig) => void;
  onRowClick?: (row: T, index: number) => void;
  selectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
  selectable?: boolean;
  getRowId?: (row: T) => string;
  dense?: boolean;
  striped?: boolean;
  hover?: boolean;
  border?: boolean;
}
