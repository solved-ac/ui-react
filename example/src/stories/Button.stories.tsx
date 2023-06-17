import { Button } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: 'The text to display inside the button',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the button',
    },
    hoverColor: {
      control: 'color',
      description: 'The background color of the button when hovered',
    },
    primary: {
      control: 'boolean',
      description: 'Whether the button should be styled as a primary button',
    },
    transparent: {
      control: 'boolean',
      description: 'Whether the button should be transparent',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button should be disabled',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the button should take up the full width of its container',
    },
    circle: {
      control: 'boolean',
      description: 'Whether the button should be circular',
    },
    padding: {
      control: { type: 'select', options: ['none', 'normal'] },
      description: 'The padding of the button',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the button as',
    },
  },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
}

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  children: 'Button',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  fullWidth: true,
  children: 'Button',
}

export const Circle = Template.bind({})
Circle.args = {
  circle: true,
  children: 'Button',
}
