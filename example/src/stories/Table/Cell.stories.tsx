import { Cell } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Table/Cell',
  component: Cell,
  argTypes: {
    children: {
      control: 'none',
      description: 'The children to display inside the cell',
    },
    padding: {
      control: {
        type: 'select',
        options: ['none', 'dense', 'normal', 'wide'],
      },
      description: 'The padding of the cell',
    },
  },
} as Meta<typeof Cell>

const Template: StoryFn<typeof Cell> = (args) => <Cell {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Cell</>,
}
