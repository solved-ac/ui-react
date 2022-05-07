import { Tab, Tabs } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    children: {
      control: 'none',
      description: 'The tabs to display',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the tabs should take up the full width of the container',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether the tabs should be displayed in multiple lines',
    },
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Tab current>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab disabled>Tab 3</Tab>
      <Tab>Tab 4</Tab>
    </>
  ),
}

export const ManyTabs = Template.bind({})
ManyTabs.args = {
  children: (
    <>
      {new Array(100).fill(undefined).map((_, i) => (
        <Tab key={i} current={i === 6}>
          Tab {i + 1}
        </Tab>
      ))}
    </>
  ),
}
