import { PaginationItem } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'PaginationItem',
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
} as ComponentMeta<typeof PaginationItem>

const Template: ComponentStory<typeof PaginationItem> = (args) => (
  <PaginationItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: '1',
}
