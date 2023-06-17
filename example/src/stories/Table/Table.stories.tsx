import { Cell, Row, Table, TableBody, TableHead } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Table/Table',
  component: Table,
  argTypes: {
    children: {
      control: 'none',
      description: 'The content to display inside the table',
    },
    padding: {
      control: {
        type: 'select',
        options: ['none', 'dense', 'normal', 'wide'],
      },
      description: 'The padding of the cell',
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      description:
        'Whether the table should take up the full width of the container',
    },
    sticky: {
      control: {
        type: 'string',
      },
      description: 'Whether the table should be sticky',
    },
  },
} as Meta<typeof Table>

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <TableHead>
        <Row>
          <Cell>#</Cell>
          <Cell>Title</Cell>
          <Cell>Solved</Cell>
          <Cell>Tries</Cell>
        </Row>
      </TableHead>
      <TableBody>
        <Row>
          <Cell>1000</Cell>
          <Cell>A+B</Cell>
          <Cell numeric>179,871</Cell>
          <Cell numeric>2.37</Cell>
        </Row>
        <Row>
          <Cell>1001</Cell>
          <Cell>A-B</Cell>
          <Cell numeric>150,867</Cell>
          <Cell numeric>1.40</Cell>
        </Row>
        <Row>
          <Cell>1002</Cell>
          <Cell>Turrets</Cell>
          <Cell numeric>26,390</Cell>
          <Cell numeric>4.59</Cell>
        </Row>
        <Row>
          <Cell>1003</Cell>
          <Cell>Fibonacci Function</Cell>
          <Cell numeric>35,585</Cell>
          <Cell numeric>3.18</Cell>
        </Row>
        <Row>
          <Cell>1004</Cell>
          <Cell>Le Petit Prince</Cell>
          <Cell numeric>8,769</Cell>
          <Cell numeric>2.34</Cell>
        </Row>
        <Row>
          <Cell>1005</Cell>
          <Cell>ACM Craft</Cell>
          <Cell numeric>8,364</Cell>
          <Cell numeric>3.92</Cell>
        </Row>
      </TableBody>
    </>
  ),
}
