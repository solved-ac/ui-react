import { PaginationItem } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/PaginationItem',
  component: PaginationItem,
  argTypes: {
    current: {
      control: 'boolean',
      description: 'Whether the item is the current one',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the item is disabled',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the item',
    },
    hoverColor: {
      control: 'color',
      description: 'The hover color of the item',
    },
    accentColor: {
      control: 'color',
      description: 'The accent color of the item',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the item as',
    },
  },
} as Meta<typeof PaginationItem>

const Template: StoryFn<typeof PaginationItem> = (args) => (
  <PaginationItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: '1',
}
