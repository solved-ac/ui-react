import { List, ListItem } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/List/List',
  component: List,
  argTypes: {
    children: {
      control: 'none',
      description: 'The children to display inside the list',
    },
  },
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
      <ListItem>Item 4</ListItem>
      <ListItem>Item 5</ListItem>
    </>
  ),
}

export const Clickable = Template.bind({})
Clickable.args = {
  children: (
    <>
      <ListItem clickable>Item 1</ListItem>
      <ListItem clickable>Item 2</ListItem>
      <ListItem clickable>Item 3</ListItem>
      <ListItem clickable>Item 4</ListItem>
      <ListItem clickable>Item 5</ListItem>
    </>
  ),
}
