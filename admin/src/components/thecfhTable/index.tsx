'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import { IPropsThecfhTable, IColumn, ISortConfig } from './type';
import styles from './style.module.css';

const ThecfhTable = <T extends Record<string, unknown>>(props: IPropsThecfhTable<T>) => {
  const {
    columns,
    rows,
    loading = false,
    emptyMessage = 'Không có dữ liệu',
    stickyHeader = true,
    maxHeight = 600,
    className = '',
    style,
    onSort,
    onRowClick,
    selectedRows = [],
    onSelectionChange,
    selectable = false,
    getRowId = (row, index) => row.id || index.toString(),
    dense = false,
    striped = false,
    hover = true,
    border = false,
  } = props;

  const [sortConfig, setSortConfig] = useState<ISortConfig | null>(null);

  // Handle sorting
  const handleSort = (column: IColumn) => {
    if (!column.sortable) return;

    const newDirection = 
      sortConfig?.key === column.id && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';

    const newSortConfig = { key: column.id, direction: newDirection };
    setSortConfig(newSortConfig);
    onSort?.(newSortConfig);
  };

  // Handle row selection
  const handleSelectAll = (checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    
    const newSelectedRows = checked ? rows.map((row, index) => getRowId(row, index)) : [];
    onSelectionChange(newSelectedRows);
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    
    const newSelectedRows = checked 
      ? [...selectedRows, rowId]
      : selectedRows.filter(id => id !== rowId);
    
    onSelectionChange(newSelectedRows);
  };

  const isAllSelected = useMemo(() => {
    return selectable && rows.length > 0 && selectedRows.length === rows.length;
  }, [selectable, rows.length, selectedRows.length]);

  const isIndeterminate = useMemo(() => {
    return selectable && selectedRows.length > 0 && selectedRows.length < rows.length;
  }, [selectable, selectedRows.length, rows.length]);

  // Get sort icon
  const getSortIcon = (column: IColumn) => {
    if (!column.sortable) return null;
    
    if (sortConfig?.key === column.id) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '⇅';
  };

  // Render table header
  const renderTableHeader = () => (
    <TableHead className={styles.tableHeader}>
      <TableRow>
        {selectable && (
          <TableCell 
            className={styles.checkboxCell}
            style={{ backgroundColor: 'var(--color-lightGreen10, #f5faf0)' }}
          >
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => handleSelectAll(e.target.checked)}
              color="primary"
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            key={column.id}
            className={`${styles.tableHeaderCell} ${column.align ? styles[column.align] : ''} ${
              column.sortable ? styles.sortable : ''
            }`}
            style={{ 
              minWidth: column.minWidth,
              backgroundColor: 'var(--color-lightGreen10, #f5faf0)'
            }}
            align={column.align}
            onClick={() => handleSort(column)}
          >
            {column.label}
            {column.sortable && (
              <span className={`${styles.sortIcon} ${
                sortConfig?.key === column.id ? styles.active : ''
              }`}>
                {getSortIcon(column)}
              </span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  // Render table body
  const renderTableBody = () => {
    if (loading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Đang tải dữ liệu...
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (rows.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>📊</div>
              <Typography variant="body1" className={styles.emptyStateText}>
                {emptyMessage}
              </Typography>
              <Typography variant="body2" className={styles.emptyStateSubtext}>
                Thử điều chỉnh bộ lọc hoặc tải lại trang
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {rows.map((row, index) => {
          const rowId = getRowId(row, index);
          const isSelected = selectedRows.includes(rowId);
          
          return (
            <TableRow
              key={rowId}
              className={`${styles.tableRow} ${
                dense ? styles.dense : ''
              } ${
                striped && !isSelected ? styles.striped : ''
              } ${
                isSelected ? styles.selected : ''
              }`}
              hover={hover && !isSelected}
              onClick={() => onRowClick?.(row, index)}
              style={{ 
                cursor: onRowClick ? 'pointer' : 'default',
                backgroundColor: isSelected ? 'var(--color-lightGreen10, #f5faf0)' : undefined
              }}
            >
              {selectable && (
                <TableCell className={styles.checkboxCell}>
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectRow(rowId, e.target.checked);
                    }}
                    color="primary"
                  />
                </TableCell>
              )}
              {columns.map((column) => {
                const value = row[column.id];
                const displayValue = column.format ? column.format(value, row) : value;
                
                return (
                  <TableCell
                    key={column.id}
                    className={`${styles.tableCell} ${dense ? styles.dense : ''} ${
                      column.align ? styles[column.align] : ''
                    }`}
                    align={column.align}
                  >
                    {displayValue}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <TableContainer
      component={Paper}
      className={`${styles.tableContainer} ${className}`}
      style={{ maxHeight, ...style }}
    >
      <Table
        className={styles.table}
        stickyHeader={stickyHeader}
        size={dense ? 'small' : 'medium'}
      >
        {renderTableHeader()}
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default ThecfhTable;
