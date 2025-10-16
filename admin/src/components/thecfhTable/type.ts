import { ReactNode } from "react";

export interface IColumn<T = any> {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: unknown, row?: T) => string | ReactNode;
  sortable?: boolean;
  searchable?: boolean;
}

export interface ISortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface IPropsThecfhTable<T = any> {
  columns: IColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
	isError?: boolean;
	errorMessage?: string;
  stickyHeader?: boolean;
  maxHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  selectedRows?: string[];
  selectable?: boolean;
  dense?: boolean;
  striped?: boolean;
  hover?: boolean;
  border?: boolean;
	minHeight?: string;
	onSelectionChange?: (selectedRows: string[]) => void;
  onSort?: (sortConfig: ISortConfig) => void;
  onRowClick?: (row: T, index: number) => void;
  getRowId?: (row: T, index: number) => string;
}
