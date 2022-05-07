import { Divider } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Divider',
  component: Divider,
  argTypes: {
    margin: {
      control: {
        type: 'select',
        options: ['none', 'normal', 'wide'],
      },
      description: 'The margin of the divider',
    },
  },
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />

export const Default = Template.bind({})
Default.args = {}
