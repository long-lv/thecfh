import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhPaginator from './index';
import { IPropsThecfhPaginator } from './type';
import { useState } from 'react';

const meta: Meta<typeof ThecfhPaginator> = {
  title: 'Components/ThecfhPaginator',
  component: ThecfhPaginator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive pagination component with page navigation and rows per page selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Current page number (0-based)',
    },
    rowsPerPage: {
      control: 'number',
      description: 'Number of rows per page',
    },
    totalRows: {
      control: 'number',
      description: 'Total number of rows',
    },
    rowsPerPageOptions: {
      control: 'object',
      description: 'Available options for rows per page',
    },
    showFirstButton: {
      control: 'boolean',
      description: 'Whether to show first page button',
    },
    showLastButton: {
      control: 'boolean',
      description: 'Whether to show last page button',
    },
    showRowsPerPage: {
      control: 'boolean',
      description: 'Whether to show rows per page selector',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the paginator is disabled',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the paginator',
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Function called when page changes',
    },
    onRowsPerPageChange: {
      action: 'rowsPerPageChanged',
      description: 'Function called when rows per page changes',
    },
  },
  args: {
    onPageChange: fn(),
    onRowsPerPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle paginator state
const PaginatorWrapper = (args: IPropsThecfhPaginator) => {
  const [page, setPage] = useState(args.page);
  const [rowsPerPage, setRowsPerPage] = useState(args.rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    args.onPageChange(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
    args.onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <ThecfhPaginator
      {...args}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 100,
  },
};

export const FirstPage: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 100,
  },
};

export const MiddlePage: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 5,
    rowsPerPage: 10,
    totalRows: 100,
  },
};

export const LastPage: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 9,
    rowsPerPage: 10,
    totalRows: 100,
  },
};

export const SmallDataset: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 5,
    totalRows: 12,
  },
};

export const LargeDataset: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 25,
    totalRows: 1000,
  },
};

export const WithoutFirstLastButtons: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 5,
    rowsPerPage: 10,
    totalRows: 100,
    showFirstButton: false,
    showLastButton: false,
  },
};

export const WithoutRowsPerPage: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 100,
    showRowsPerPage: false,
  },
};

export const Disabled: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 5,
    rowsPerPage: 10,
    totalRows: 100,
    disabled: true,
  },
};

export const Small: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 100,
    size: 'small',
  },
};

export const CustomRowsPerPageOptions: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 20,
    totalRows: 100,
    rowsPerPageOptions: [5, 10, 20, 50],
  },
};

export const WithCustomStyle: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 100,
    style: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
    },
  },
};

export const EmptyDataset: Story = {
  render: (args) => <PaginatorWrapper {...args} />,
  args: {
    page: 0,
    rowsPerPage: 10,
    totalRows: 0,
  },
};
