import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ThecfhCheckbox } from './index';
import { IPropsThecfhCheckbox } from './type';

const meta: Meta<typeof ThecfhCheckbox> = {
  title: 'Components/ThecfhCheckbox',
  component: ThecfhCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component built with Material-UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the checkbox',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when checkbox state changes',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: false,
  },
};

export const Checked: Story = {
  args: {
    value: true,
  },
};

export const Disabled: Story = {
  args: {
    value: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    value: true,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    value: false,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    value: false,
    size: 'medium',
  },
};

export const WithCustomStyle: Story = {
  args: {
    value: false,
    style: {
      color: '#2196F3',
      transform: 'scale(1.2)',
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    value: false,
    className: 'custom-checkbox',
  },
};
