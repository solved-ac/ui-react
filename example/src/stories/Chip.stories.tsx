import { Chip } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Chip',
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
  },
} as ComponentMeta<typeof Chip>

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Lorem ipsum</>,
}
