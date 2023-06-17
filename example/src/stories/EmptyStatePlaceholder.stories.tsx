import { EmptyStatePlaceholder } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/EmptyStatePlaceholder',
  component: EmptyStatePlaceholder,
  argTypes: {
    children: {
      control: 'text',
      description: 'The text to display',
    },
    padding: {
      control: { type: 'select', options: ['none', 'normal', 'wide'] },
      description: 'The padding of the placeholder',
    },
    fullHeight: {
      control: 'boolean',
      description:
        'Whether the placeholder should take up the full height of its container',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the placeholder as',
    },
  },
} as Meta<typeof EmptyStatePlaceholder>

const Template: StoryFn<typeof EmptyStatePlaceholder> = (args) => (
  <EmptyStatePlaceholder {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <>Nothing to display here!</>,
}
