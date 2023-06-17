import { Chip } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'The background color of the chip',
    },
    children: {
      control: 'text',
      description: 'The text to display',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the chip as',
    },
  },
} as Meta<typeof Chip>

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Lorem ipsum</>,
}
