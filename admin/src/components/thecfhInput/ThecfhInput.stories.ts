import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhInput from './index';
import { IPropsThecfhInput } from './type';

const meta: Meta<typeof ThecfhInput> = {
  title: 'Components/ThecfhInput',
  component: ThecfhInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input component with various types and styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'password'],
      description: 'Type of the input field',
    },
    width: {
      control: 'text',
      description: 'Width of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when input value changes',
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Function called when a key is pressed down',
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Function called when a key is released',
    },
  },
  args: {
    onChange: fn(),
    onKeyDown: fn(),
    onKeyUp: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text here...',
    value: 'Sample text',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Enter number...',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const CustomWidth: Story = {
  args: {
    placeholder: 'Custom width input',
    width: '400px',
  },
};

export const SmallWidth: Story = {
  args: {
    placeholder: 'Small input',
    width: '150px',
  },
};

export const LargeWidth: Story = {
  args: {
    placeholder: 'Large input field',
    width: '500px',
  },
};

export const WithCustomStyle: Story = {
  args: {
    placeholder: 'Custom styled input',
    style: {
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '16px',
    },
  },
};
