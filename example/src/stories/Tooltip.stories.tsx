import { Button, Tooltip } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title to display',
      defaultValue: 'Tooltip',
    },
    noDefaultStyles: {
      control: 'boolean',
      description: 'Whether to use the default styles',
      defaultValue: false,
    },
  },
} as Meta<typeof Tooltip>

const Template: StoryFn<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Button>Hover me!</Button>,
  title: 'Tooltip',
}
