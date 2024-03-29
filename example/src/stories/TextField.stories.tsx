import { TextField } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the text field',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the text field should be full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the text field should be disabled',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether the text field should be multiline',
    },
    resizable: {
      control: {
        type: 'select',
        options: ['none', 'both', 'horizontal', 'vertical'],
      },
      description: 'Whether the text field should be resizable',
    },
  },
} as Meta<typeof TextField>

const Template: StoryFn<typeof TextField> = (args) => (
  <TextField {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 'TextField',
}
