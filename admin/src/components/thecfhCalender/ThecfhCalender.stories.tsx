import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhCalender from './index';
import { IPropsThecfhCalender } from './type';
import { useState } from 'react';

const meta: Meta<typeof ThecfhCalender> = {
  title: 'Components/ThecfhCalender',
  component: ThecfhCalender,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable calendar component for single date or date range selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Mode of the calendar: single date or date range selection',
    },
    width: {
      control: 'text',
      description: 'Width of the calendar component',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the calendar is disabled',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    onChange: {
      action: 'dateChanged',
      description: 'Function called when date selection changes (single mode)',
    },
    onRangeChange: {
      action: 'rangeChanged',
      description: 'Function called when date range selection changes (range mode)',
    },
  },
  args: {
    onChange: fn(),
    onRangeChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle calendar state
const CalendarWrapper = (args: IPropsThecfhCalender) => {
  const [value, setValue] = useState<Date | null>(args.value || null);
  const [valueRange, setValueRange] = useState<[Date | null, Date | null]>(
    args.valueRange || [null, null]
  );

  const handleChange = (date: Date | null) => {
    setValue(date);
    args.onChange?.(date);
  };

  const handleRangeChange = (range: [Date | null, Date | null]) => {
    setValueRange(range);
    args.onRangeChange?.(range);
  };

  return (
    <ThecfhCalender
      {...args}
      value={value}
      valueRange={valueRange}
      onChange={handleChange}
      onRangeChange={handleRangeChange}
    />
  );
};

export const Default: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
  },
};

export const SingleDate: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    value: new Date('2024-01-15'),
  },
};

export const DateRange: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'range',
    valueRange: [new Date('2024-01-10'), new Date('2024-01-20')],
  },
};

export const Disabled: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    disabled: true,
  },
};

export const WithMinDate: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    minDate: new Date('2024-01-01'),
  },
};

export const WithMaxDate: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    maxDate: new Date('2024-12-31'),
  },
};

export const WithDateRange: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
  },
};

export const CustomWidth: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    width: '300px',
  },
};

export const RangeWithLimits: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'range',
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
  },
};

export const WithCustomStyle: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    mode: 'single',
    style: {
      border: '2px solid #2196F3',
      borderRadius: '8px',
    },
  },
};
