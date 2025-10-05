import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhButton from './index';
import { IPropsThecfhButton } from './type';

const meta: Meta<typeof ThecfhButton> = {
  title: 'Components/ThecfhButton',
  component: ThecfhButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component with various styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content of the button',
    },
    width: {
      control: 'text',
      description: 'Width of the button',
    },
    height: {
      control: 'text',
      description: 'Height of the button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    className: 'bg-gray-500 text-white hover:bg-gray-600',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const CustomSize: Story = {
  args: {
    label: 'Custom Size',
    width: '200px',
    height: '50px',
    className: 'bg-green-500 text-white hover:bg-green-600',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    width: '80px',
    height: '32px',
    className: 'text-sm bg-purple-500 text-white hover:bg-purple-600',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    width: '300px',
    height: '60px',
    className: 'text-lg bg-orange-500 text-white hover:bg-orange-600',
  },
};

export const WithCustomStyle: Story = {
  args: {
    label: 'Custom Style',
    style: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
      borderRadius: '8px',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
  },
};
