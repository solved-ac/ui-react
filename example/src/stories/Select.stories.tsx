import { Select } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the select',
    },
    items: {
      control: 'none',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the selector should take up the full width of its container',
    },
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 'Select',
  items: Array(10)
    .fill(undefined)
    .map((_, i) => `Item ${i}`),
}

export const LongEntries = Template.bind({})
LongEntries.args = {
  value: 'Select',
  items: Array(256)
    .fill(undefined)
    .map((_, i) => `Item ${i}`),
}

export const CustomRender = Template.bind({})
CustomRender.args = {
  value: 'Select',
  items: ['kr', 'gb', 'us', 'jp'],
  render: (s: string) => (
    <>
      <img
        src={`https://flagicons.lipis.dev/flags/4x3/${s}.svg`}
        alt={s}
        style={{ height: '1em' }}
      />{' '}
      {s}
    </>
  ),
}
