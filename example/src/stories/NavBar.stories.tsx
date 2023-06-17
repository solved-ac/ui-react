import { Centering, Container, NavBar } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/NavBar',
  component: NavBar,
  argTypes: {
    children: {
      control: 'none',
      description: 'Children to display',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'The background color of the navbar',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the container as',
    },
  },
} as Meta<typeof NavBar>

const Template: StoryFn<typeof NavBar> = (args) => <NavBar {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Container>
        <Centering style={{ height: '100%' }}>NavBar</Centering>
      </Container>
    </>
  ),
}
