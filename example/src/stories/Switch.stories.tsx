import { Switch } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Whether the switch is on or off',
      defaultValue: false,
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the switch',
    },
    backgroundActiveColor: {
      control: 'color',
      description: 'The background color of the switch when active',
    },
    knobColor: {
      control: 'color',
      description: 'The color of the knob',
    },
    knobBorderColor: {
      control: 'color',
      description: 'The border color of the knob',
    },
    knobActiveColor: {
      control: 'color',
      description: 'The color of the knob when active',
    },
    knobActiveBorderColor: {
      control: 'color',
      description: 'The border color of the knob when active',
    },
  },
} as Meta<typeof Switch>

const Template: StoryFn<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  value: true,
}
