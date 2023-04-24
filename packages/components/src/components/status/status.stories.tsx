import { Meta, StoryObj } from '@storybook/react';

import Status from './status';

const meta: Meta<typeof Status> = {
  component: Status,
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Success: Story = {
  args: {
    children: 'Aktiivne',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    type: 'error',
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive',
    type: 'inactive',
  },
};
