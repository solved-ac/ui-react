import { Tab } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Tab/Tab',
  component: Tab,
  argTypes: {
    current: {
      control: 'boolean',
      description: 'Whether the tab is currently selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tab is disabled',
    },
    children: {
      control: 'text',
      description: 'The text to display',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the tab',
    },
    hoverColor: {
      control: 'color',
      description: 'The background color of the tab when hovered',
    },
    accentColor: {
      control: 'color',
      description: 'The accent color of the tab. This color is used for the bottom border of the tab when selected.',
    },
    accentHintColor: {
      control: 'color',
      description: 'The accent hint color of the tab. This color is used for the bottom border of the tab when not selected.',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the item as',
    },
  },
} as Meta<typeof Tab>

const Template: StoryFn<typeof Tab> = (args) => <Tab {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Tab',
}
