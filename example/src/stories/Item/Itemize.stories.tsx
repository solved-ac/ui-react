import { Enumerate, Item, Itemize } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Item/Itemize',
  component: Itemize,
  argTypes: {
    children: {
      control: 'none',
      description: 'The children to display inside the list',
    },
    marker: {
      control: {
        type: 'select',
        options: ['✓', '✗', '—'],
      },
    },
  },
} as Meta<typeof Itemize>

const Template: StoryFn<typeof Itemize> = (args) => <Itemize {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
      <Item>Item 4</Item>
      <Item>Item 5</Item>
    </>
  ),
}

export const Nested = Template.bind({})
Nested.args = {
  children: (
    <>
      <Item>
        Item 1
        <Enumerate>
          <Item>Enumerated 1</Item>
          <Item>Enumerated 2</Item>
          <Item>Enumerated 3</Item>
          <Item>Enumerated 4</Item>
        </Enumerate>
      </Item>
      <Item>
        Item 2
        <Itemize>
          <Item>Item 2.1</Item>
          <Item>Item 2.2</Item>
          <Item>Item 2.3</Item>
          <Item>Item 2.4</Item>
        </Itemize>
      </Item>
      <Item>Item 3</Item>
      <Item>Item 4</Item>
      <Item>Item 5</Item>
    </>
  ),
}
