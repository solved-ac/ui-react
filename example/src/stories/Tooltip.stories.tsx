import { Button, Tooltip } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
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
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Button>Hover me!</Button>,
  title: 'Tooltip',
}
