import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhSelect from './index';
import { IPropsThecfhSelect } from './type';
import { IDropDown } from '@/src/constants';

const meta: Meta<typeof ThecfhSelect> = {
  title: 'Components/ThecfhSelect',
  component: ThecfhSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable select dropdown component built with Material-UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current selected value',
    },
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    width: {
      control: 'text',
      description: 'Width of the select field',
    },
    height: {
      control: 'text',
      description: 'Height of the select field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the select field',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when selection changes',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: IDropDown[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

const manyOptions: IDropDown[] = Array.from({ length: 20 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `option${i + 1}`,
}));

export const Default: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an option',
    value: 'option2',
  },
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    label: 'Small Select',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    options: sampleOptions,
    label: 'Medium Select',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    label: 'Disabled Select',
    disabled: true,
  },
};

export const CustomSize: Story = {
  args: {
    options: sampleOptions,
    label: 'Custom Size',
    width: '300px',
    height: '50px',
  },
};

export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    label: 'Many Options',
    width: '250px',
  },
};

export const WithCustomStyle: Story = {
  args: {
    options: sampleOptions,
    label: 'Custom Styled Select',
    style: {
      border: '2px solid #2196F3',
      borderRadius: '8px',
    },
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    label: 'No Options Available',
  },
};
