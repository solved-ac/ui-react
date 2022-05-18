import { Centering, Container, NavBar } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'NavBar',
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
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

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
