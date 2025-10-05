import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ThecfhDialog from './index';
import { IPropsThecfhDialog } from './type';
import { useState } from 'react';

const meta: Meta<typeof ThecfhDialog> = {
  title: 'Components/ThecfhDialog',
  component: ThecfhDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable dialog component with various display options and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'Title of the dialog',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the dialog',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the dialog should take full width',
    },
    fullScreen: {
      control: 'boolean',
      description: 'Whether the dialog should be full screen',
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'Whether to disable closing on backdrop click',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'Whether to disable closing on escape key',
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    closeButtonText: {
      control: 'text',
      description: 'Text for the close button',
    },
    confirmButton: {
      control: 'boolean',
      description: 'Whether to show confirm button',
    },
    confirmButtonText: {
      control: 'text',
      description: 'Text for the confirm button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the dialog is in loading state',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when dialog is closed',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Function called when confirm button is clicked',
    },
  },
  args: {
    onClose: fn(),
    onConfirm: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle dialog state
const DialogWrapper = (args: IPropsThecfhDialog) => {
  const [open, setOpen] = useState(args.open);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Dialog
      </button>
      <ThecfhDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Default Dialog',
    children: 'This is the content of the dialog.',
  },
};

export const WithTitle: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Dialog with Title',
    children: 'This dialog has a title and content.',
  },
};

export const WithActions: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Dialog with Actions',
    children: 'This dialog has both close and confirm buttons.',
    closeButton: true,
    confirmButton: true,
    closeButtonText: 'Cancel',
    confirmButtonText: 'Save',
  },
};

export const Small: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Small Dialog',
    children: 'This is a small dialog.',
    maxWidth: 'xs',
  },
};

export const Large: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Large Dialog',
    children: 'This is a large dialog with more content. It can contain more information and is suitable for complex forms or detailed views.',
    maxWidth: 'lg',
  },
};

export const FullWidth: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Full Width Dialog',
    children: 'This dialog takes the full width of the screen.',
    fullWidth: true,
  },
};

export const WithLoading: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Loading Dialog',
    children: 'This dialog is in loading state.',
    confirmButton: true,
    loading: true,
  },
};

export const DisableBackdropClick: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'No Backdrop Close',
    children: 'This dialog cannot be closed by clicking the backdrop.',
    disableBackdropClick: true,
  },
};

export const CustomWidth: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Custom Width Dialog',
    children: 'This dialog has a custom width.',
    width: '600px',
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'No Close Button',
    children: 'This dialog has no close button in the header.',
    closeButton: false,
  },
};

export const ComplexContent: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Complex Content Dialog',
    children: (
      <div>
        <h3>Form Example</h3>
        <form>
          <div style={{ marginBottom: '16px' }}>
            <label>Name:</label>
            <input type="text" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Email:</label>
            <input type="email" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </div>
          <div>
            <label>Message:</label>
            <textarea style={{ width: '100%', padding: '8px', marginTop: '4px', height: '100px' }} />
          </div>
        </form>
      </div>
    ),
    confirmButton: true,
    closeButton: true,
  },
};
