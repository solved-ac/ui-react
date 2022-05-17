import { ListItem } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'ListItem',
  component: ListItem,
  argTypes: {
    children: {
      control: 'text',
      description: 'The children to display inside the list item',
    },
    padding: {
      control: {
        type: 'select',
        options: ['none', 'normal', 'wide'],
      },
      description: 'The padding of the list item',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the list item should be clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the clickable list item should be disabled',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the list item',
    },
    hoverColor: {
      control: 'color',
      description:
        'The background color of the clickable list item when hovered',
    },
    as: {
      control: {
        type: 'select',
        options: ['div', 'span', 'button', 'a'],
      },
      description: 'The element to render the list item as',
    },
  },
} as ComponentMeta<typeof ListItem>

const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <>Item</>,
}

export const Clickable = Template.bind({})
Clickable.args = {
  clickable: true,
  children: <>Item</>,
}
