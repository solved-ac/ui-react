import { Divider } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    margin: {
      control: {
        type: 'select',
        options: ['none', 'normal', 'wide'],
      },
      description: 'The margin of the divider',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the divider as',
    },
  },
} as Meta<typeof Divider>

const Template: StoryFn<typeof Divider> = (args) => <Divider {...args} />

export const Default = Template.bind({})
Default.args = {}
