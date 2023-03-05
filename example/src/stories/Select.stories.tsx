import { Centering, Select } from '@solved-ac/ui-react'
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
    disableEllipsis: {
      control: 'boolean',
      description: 'Whether the selector should disable ellipsis',
    },
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <Centering>
    <Select {...args} />
  </Centering>
)

export const Default = Template.bind({})
Default.args = {
  value: 'Select',
  items: Array(10)
    .fill(undefined)
    .map((_, i) => `Item ${i + 1}`),
}

export const LongEntries = Template.bind({})
LongEntries.args = {
  value: 'Select',
  items: Array(256)
    .fill(undefined)
    .map((_, i) => `Item ${i + 1}`),
}

export const LongContents = Template.bind({})
LongContents.args = {
  value: 'Select',
  items: Array(256)
    .fill(undefined)
    .map((_, i) => `Item ${i + 1} `.repeat(i + 1)),
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

export const CustomTypes = Template.bind({})
CustomTypes.args = {
  value: 'Select',
  items: [
    {
      value: 'kr',
      icon: 'https://flagicons.lipis.dev/flags/4x3/kr.svg',
      label: 'Korea',
    },
    {
      value: 'gb',
      icon: 'https://flagicons.lipis.dev/flags/4x3/gb.svg',
      label: 'United Kingdom',
    },
    {
      value: 'us',
      icon: 'https://flagicons.lipis.dev/flags/4x3/us.svg',
      label: 'United States',
    },
    {
      value: 'jp',
      icon: 'https://flagicons.lipis.dev/flags/4x3/jp.svg',
      label: 'Japan',
    },
  ],
  render: (s: { value: string; icon: string; label: string }) => (
    <>
      <img src={s.icon} alt={s.label} style={{ height: '1em' }} /> {s.label}
    </>
  ),
}
