import { Cell } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
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
        options: ['none', 'normal', 'wide'],
      },
      description: 'The padding of the cell',
    },
  },
} as ComponentMeta<typeof Cell>

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Cell</>,
}
