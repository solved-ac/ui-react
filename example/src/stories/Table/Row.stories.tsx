import { Cell, Row } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Table/Row',
  component: Row,
  argTypes: {
    children: {
      control: 'none',
      description: 'The cells to display inside the row',
    },
    padding: {
      control: {
        type: 'select',
        options: ['none', 'dense', 'normal', 'wide'],
      },
      description: 'The padding of the cell',
    },
    header: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the row is a header',
    },
  },
} as ComponentMeta<typeof Row>

const Template: ComponentStory<typeof Row> = (args) => <Row {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Cell>Cell 1</Cell>
      <Cell>Cell 2</Cell>
      <Cell>Cell 3</Cell>
      <Cell>Cell 4</Cell>
      <Cell>Cell 5</Cell>
    </>
  ),
}
