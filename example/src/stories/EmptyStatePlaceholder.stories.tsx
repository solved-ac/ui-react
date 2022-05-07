import { EmptyStatePlaceholder } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'EmptyStatePlaceholder',
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
  },
} as ComponentMeta<typeof EmptyStatePlaceholder>

const Template: ComponentStory<typeof EmptyStatePlaceholder> = (args) => (
  <EmptyStatePlaceholder {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <>Nothing to display here!</>,
}
