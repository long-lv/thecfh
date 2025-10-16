'use client';

import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';
import styles from './style.module.css';
import { IPropsThecfhPaginator } from './type';

const ThecfhPaginator: React.FC<IPropsThecfhPaginator> = (props) => {
  const {
    page,
    rowsPerPage,
    totalRows,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [10, 25, 50, 100],
    showFirstButton = true,
    showLastButton = true,
    showRowsPerPage = true,
    className = '',
    style,
    disabled = false,
    labelRowsPerPage = 'Rows per page:',
    labelDisplayedRows = (from, to, count) => `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
    size = 'medium',
  } = props;

  // Convert 1-based page to 0-based for internal calculations
  const internalPage = page - 1;
  
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = internalPage * rowsPerPage + 1;
  const endIndex = Math.min((internalPage + 1) * rowsPerPage, totalRows);

  const handleFirstPage = () => {
    if (!disabled && internalPage > 0) {
      onPageChange(1); // Convert to 1-based
    }
  };

  const handlePreviousPage = () => {
    if (!disabled && internalPage > 0) {
      onPageChange(page - 1); // Already 1-based
    }
  };

  const handleNextPage = () => {
    if (!disabled && internalPage < totalPages - 1) {
      onPageChange(page + 1); // Already 1-based
    }
  };

  const handleLastPage = () => {
    if (!disabled && internalPage < totalPages - 1) {
      onPageChange(totalPages); // Convert to 1-based
    }
  };

  const handlePageClick = (newPage: number) => {
    if (!disabled && newPage !== internalPage && newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage + 1); // Convert to 1-based
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    const newRowsPerPage = event.target.value as number;
    onRowsPerPageChange(newRowsPerPage);
    // Reset to first page when changing rows per page
    onPageChange(1); // Convert to 1-based
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      if (page > 2) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(1, page - 1);
      const end = Math.min(totalPages - 2, page + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 0 && i !== totalPages - 1) {
          pages.push(i);
        }
      }

      if (page < totalPages - 3) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  if (totalRows === 0) {
    return null;
  }

  return (
    <div className={`${styles.paginatorContainer} ${size === 'small' ? styles.small : ''} ${className}`} style={style}>
      {/* Left side - Rows per page */}
      {showRowsPerPage && (
        <div className={styles.paginatorInfo}>
          <div className={styles.rowsPerPageContainer}>
            <span className={styles.rowsPerPageLabel}>{labelRowsPerPage}</span>
            <FormControl size={size} disabled={disabled}>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className={styles.rowsPerPageSelect}
                variant="outlined"
                size={size}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      {/* Right side - Pagination controls */}
      <div className={styles.paginationControls}>
        {/* First button */}
        {showFirstButton && (
          <button
            className={styles.navigationButton}
            onClick={handleFirstPage}
            disabled={disabled || internalPage === 0}
            title="First page"
          >
            ⟪
          </button>
        )}

        {/* Previous button */}
        <button
          className={styles.navigationButton}
          onClick={handlePreviousPage}
          disabled={disabled || internalPage === 0}
          title="Previous page"
        >
          ‹
        </button>

        {/* Page info */}
        <div className={styles.pageInfo}>
          {labelDisplayedRows(startIndex, endIndex, totalRows)}
        </div>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className={styles.ellipsis}>...</span>
            ) : (
              <button
                className={`${styles.pageButton} ${
                  pageNum === internalPage ? styles.active : ''
                }`}
                onClick={() => handlePageClick(pageNum as number)}
                disabled={disabled}
                title={`Page ${(pageNum as number) + 1}`}
              >
                {(pageNum as number) + 1}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <button
          className={styles.navigationButton}
          onClick={handleNextPage}
          disabled={disabled || internalPage >= totalPages - 1}
          title="Next page"
        >
          ›
        </button>

        {/* Last button */}
        {showLastButton && (
          <button
            className={styles.navigationButton}
            onClick={handleLastPage}
            disabled={disabled || internalPage >= totalPages - 1}
            title="Last page"
          >
            ⟫
          </button>
        )}
      </div>
    </div>
  );
};

export default ThecfhPaginator;
