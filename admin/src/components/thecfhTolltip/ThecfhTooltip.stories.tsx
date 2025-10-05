import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThecfhTooltip from './index';
import { IPropsThecfhTooltip } from './type';

const meta: Meta<typeof ThecfhTooltip> = {
  title: 'Components/ThecfhTooltip',
  component: ThecfhTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable tooltip component built with Material-UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The content that triggers the tooltip',
    },
    description: {
      control: 'text',
      description: 'The tooltip text to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Inline styles for the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Hover me',
    description: 'This is a tooltip',
  },
};

export const LongText: Story = {
  args: {
    title: 'Hover for long description',
    description: 'This is a very long tooltip description that demonstrates how the tooltip handles longer text content. It should wrap appropriately and remain readable.',
  },
};

export const Button: Story = {
  args: {
    title: <button style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
      Click me
    </button>,
    description: 'This tooltip is attached to a button',
  },
};

export const Icon: Story = {
  args: {
    title: <span style={{ fontSize: '24px' }}>ℹ️</span>,
    description: 'This tooltip is attached to an icon',
  },
};

export const CustomStyled: Story = {
  args: {
    title: <div style={{ 
      padding: '12px 24px', 
      backgroundColor: '#4CAF50', 
      color: 'white', 
      borderRadius: '8px',
      fontWeight: 'bold'
    }}>
      Custom Styled Element
    </div>,
    description: 'This tooltip is attached to a custom styled element',
  },
};

export const WithCustomStyle: Story = {
  args: {
    title: 'Styled Tooltip',
    description: 'This tooltip has custom styling',
    style: {
      border: '2px solid #FF9800',
      borderRadius: '8px',
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    title: 'Custom Class Tooltip',
    description: 'This tooltip has a custom CSS class',
    className: 'custom-tooltip',
  },
};

export const ComplexContent: Story = {
  args: {
    title: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <span>📊</span>
        <span>Analytics</span>
      </div>
    ),
    description: 'This tooltip contains complex content with icons and text',
  },
};

export const Link: Story = {
  args: {
    title: <a href="#" style={{ color: '#2196F3', textDecoration: 'underline' }}>
      Learn more
    </a>,
    description: 'This tooltip is attached to a link',
  },
};
