import { Button, Centering, Dropdown } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import TooltipStories from './Tooltip.stories'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    ...TooltipStories.argTypes,
    interactive: {
      ...(TooltipStories.argTypes?.interactive || {}),
      defaultValue: true,
    },
    activateOnHover: {
      ...(TooltipStories.argTypes?.activateOnHover || {}),
      defaultValue: false,
    },
    activateOnClick: {
      ...(TooltipStories.argTypes?.activateOnClick || {}),
      defaultValue: true,
    },
    noThemeChange: {
      ...(TooltipStories.argTypes?.noThemeChange || {}),
      defaultValue: true,
    },
  },
} as Meta<typeof Dropdown>

const Template: StoryFn<typeof Dropdown> = (args) => (
  <Centering
    style={{
      height: 200,
    }}
  >
    <Dropdown {...args} />
  </Centering>
)

export const Default = Template.bind({})
Default.args = {
  children: <Button>Click me!</Button>,
  title: 'Dropdown',
}
