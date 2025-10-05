import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhTable from './index';
import { IPropsThecfhTable, IColumn } from './type';

const meta: Meta<typeof ThecfhTable> = {
  title: 'Components/ThecfhTable',
  component: ThecfhTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive table component with sorting, selection, and various display options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when no data is available',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Whether the header should stick to top when scrolling',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the table container',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    dense: {
      control: 'boolean',
      description: 'Whether to use dense spacing',
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped rows',
    },
    hover: {
      control: 'boolean',
      description: 'Whether to show hover effects on rows',
    },
    border: {
      control: 'boolean',
      description: 'Whether to show borders',
    },
    onSort: {
      action: 'sorted',
      description: 'Function called when sorting changes',
    },
    onRowClick: {
      action: 'rowClicked',
      description: 'Function called when a row is clicked',
    },
    onSelectionChange: {
      action: 'selectionChanged',
      description: 'Function called when selection changes',
    },
  },
  args: {
    onSort: fn(),
    onRowClick: fn(),
    onSelectionChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
interface SampleData {
  id: string;
  name: string;
  email: string;
  age: number;
  status: string;
  department: string;
}

const sampleData: SampleData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, status: 'Active', department: 'Engineering' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 28, status: 'Active', department: 'Marketing' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'Inactive', department: 'Sales' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 32, status: 'Active', department: 'HR' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, status: 'Pending', department: 'Engineering' },
];

const columns: IColumn<SampleData>[] = [
  { id: 'name', label: 'Name', minWidth: 150, sortable: true },
  { id: 'email', label: 'Email', minWidth: 200, sortable: true },
  { id: 'age', label: 'Age', minWidth: 80, align: 'right', sortable: true },
  { id: 'status', label: 'Status', minWidth: 100, sortable: true },
  { id: 'department', label: 'Department', minWidth: 150, sortable: true },
];

export const Default: Story = {
  args: {
    columns,
    rows: sampleData,
  },
};

export const WithSelection: Story = {
  args: {
    columns,
    rows: sampleData,
    selectable: true,
    selectedRows: ['1', '3'],
  },
};

export const Loading: Story = {
  args: {
    columns,
    rows: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    rows: [],
    emptyMessage: 'No data available',
  },
};

export const Dense: Story = {
  args: {
    columns,
    rows: sampleData,
    dense: true,
  },
};

export const Striped: Story = {
  args: {
    columns,
    rows: sampleData,
    striped: true,
  },
};

export const WithoutHover: Story = {
  args: {
    columns,
    rows: sampleData,
    hover: false,
  },
};

export const CustomHeight: Story = {
  args: {
    columns,
    rows: sampleData,
    maxHeight: 300,
  },
};

export const WithCustomStyle: Story = {
  args: {
    columns,
    rows: sampleData,
    style: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    },
  },
};

export const LargeDataset: Story = {
  args: {
    columns,
    rows: Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 40),
      status: ['Active', 'Inactive', 'Pending'][i % 3],
      department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
    })),
    maxHeight: 400,
  },
};
