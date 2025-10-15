"use client";

import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import styles from "./style.module.css";
import { IColumn, IPropsThecfhTable, ISortConfig } from "./type";

const ThecfhTable = <T extends Record<string, any> = any>(
  props: IPropsThecfhTable<T>
) => {
  const {
    columns,
    data,
    loading = false,
    emptyMessage = "No data",
		errorMessage = "Is error, please try again!",
		isError= false,
    stickyHeader = true,
    maxHeight = 600,
    className = "",
    style,
    selectedRows = [],
    selectable = false,
    dense = false,
    striped = false,
    hover = true,
		minHeight="400px",
    onSelectionChange,
    onSort,
    onRowClick,
    getRowId = (row, index) => row.id || index.toString(),
  } = props;

  const [sortConfig, setSortConfig] = useState<ISortConfig | null>(null);

  // Handle sorting
  const handleSort = (column: IColumn) => {
    if (!column.sortable) return;

    const newDirection =
      sortConfig?.key === column.id && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const newSortConfig = { key: column.id, direction: newDirection };
    setSortConfig(newSortConfig);
    onSort?.(newSortConfig);
  };

  // Handle row selection
  const handleSelectAll = (checked: boolean) => {
    if (!selectable || !onSelectionChange) return;

    const newSelectedRows = checked
      ? data.map((row, index) => getRowId(row, index))
      : [];
    onSelectionChange(newSelectedRows);
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;

    const newSelectedRows = checked
      ? [...selectedRows, rowId]
      : selectedRows.filter((id) => id !== rowId);

    onSelectionChange(newSelectedRows);
  };

  const isAllSelected = useMemo(() => {
    return selectable && data.length > 0 && selectedRows.length === data.length;
  }, [selectable, data.length, selectedRows.length]);

  const isIndeterminate = useMemo(() => {
    return (
      selectable && selectedRows.length > 0 && selectedRows.length < data.length
    );
  }, [selectable, selectedRows.length, data.length]);

  // Get sort icon
  const getSortIcon = (column: IColumn) => {
    if (!column.sortable) return null;

    if (sortConfig?.key === column.id) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "⇅";
  };

  // Render table header
  const renderTableHeader = () => (
    <TableHead className={styles.tableHeader}>
      <TableRow>
        {selectable && (
          <TableCell
            className={styles.checkboxCell}
            style={{ backgroundColor: "var(--color-lightGreen10, #f5faf0)" }}
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
            className={`${styles.tableHeaderCell} ${
              column.align ? styles[column.align] : ""
            } ${column.sortable ? styles.sortable : ""}`}
            style={{
              minWidth: column.minWidth,
              backgroundColor: "var(--color-lightGreen10, #f5faf0)",
            }}
            align={column.align}
            onClick={() => handleSort(column)}
          >
            {column.label}
            {column.sortable && (
              <span
                className={`${styles.sortIcon} ${
                  sortConfig?.key === column.id ? styles.active : ""
                }`}
              >
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
            <TableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className={styles.loadingState}
            >
             <div className="flex w-full h-full justify-center items-center">
							 <div className={styles.loadingSpinner}></div>
						 </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (data.length === 0) {
      return (
        <TableBody className="w-full h-full flex justify-center">
          <TableRow>
            <TableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className={styles.emptyState}
            >
              <div className="table-emtpy flex items-center flex-col">
                <div className={styles.emptyStateIcon}>📊</div>
                <Typography variant="body1" className={styles.emptyStateText}>
                  {isError ? errorMessage : emptyMessage}
                </Typography>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {data.map((row, index) => {
          const rowId = getRowId(row, index);
          const isSelected = selectedRows.includes(rowId);

          return (
            <TableRow
              key={rowId}
              className={`${styles.tableRow} ${dense ? styles.dense : ""} ${
                striped && !isSelected ? styles.striped : ""
              } ${isSelected ? styles.selected : ""}`}
              hover={hover && !isSelected}
              onClick={() => onRowClick?.(row, index)}
              style={{
                cursor: onRowClick ? "pointer" : "default",
                backgroundColor: isSelected
                  ? "var(--color-lightGreen10, #f5faf0)"
                  : undefined,
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
                const value = (row as any)[column.id];
                const displayValue = column.format
                  ? column.format(value, row)
                  : value;

                return (
                  <TableCell
                    key={column.id}
                    className={`${styles.tableCell} ${
                      dense ? styles.dense : ""
                    } ${column.align ? styles[column.align] : ""}`}
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
      style={{ maxHeight, minHeight, ...style }}
    >
      <Table
        className={styles.table}
        stickyHeader={stickyHeader}
        size={dense ? "small" : "medium"}
      >
        {renderTableHeader()}
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default ThecfhTable;
