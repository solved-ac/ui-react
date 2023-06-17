import { Card } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    children: {
      control: 'text',
      description: 'The text to display inside the card',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the card',
    },
    hoverColor: {
      control: 'color',
      description: 'The background color of the clickable card when hovered',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card should be clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the clickable card should be disabled',
    },
    padding: {
      control: { type: 'select', options: ['none', 'normal', 'wide'] },
      description: 'The padding of the card',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the card as',
    },
  },
} as Meta<typeof Card>

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
vulputate arcu, nec semper est. Vestibulum ante ipsum primis in faucibus
orci luctus et ultrices posuere cubilia curae; Suspendisse vel purus et
metus laoreet efficitur in ut elit. Duis ultrices enim dapibus purus
imperdiet molestie. Nam pretium odio metus, tempus vehicula neque sodales
quis. Suspendisse vehicula, libero ac viverra consectetur, ante lectus
malesuada ex, ut porta nunc justo quis neque. Aenean tristique nulla quis
eros faucibus, sit amet lacinia nibh interdum. Quisque aliquet leo ut erat
ultrices posuere. Duis mauris nulla, posuere sed dapibus eget, ultricies
id dui. Phasellus vel augue a urna fermentum vehicula. Quisque sed elit
non nibh ullamcorper lacinia. Orci varius natoque penatibus et magnis dis
parturient montes, nascetur ridiculus mus. Duis nibh ligula, scelerisque
porta rutrum ac, tempus vitae ipsum. Morbi ut ante a felis fringilla
aliquam bibendum nec felis. Donec vel nunc congue, rhoncus mauris quis,
malesuada nisi.`,
}

export const Clickable = Template.bind({})
Clickable.args = {
  clickable: true,
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
vulputate arcu, nec semper est. Vestibulum ante ipsum primis in faucibus
orci luctus et ultrices posuere cubilia curae; Suspendisse vel purus et
metus laoreet efficitur in ut elit. Duis ultrices enim dapibus purus
imperdiet molestie. Nam pretium odio metus, tempus vehicula neque sodales
quis. Suspendisse vehicula, libero ac viverra consectetur, ante lectus
malesuada ex, ut porta nunc justo quis neque. Aenean tristique nulla quis
eros faucibus, sit amet lacinia nibh interdum. Quisque aliquet leo ut erat
ultrices posuere. Duis mauris nulla, posuere sed dapibus eget, ultricies
id dui. Phasellus vel augue a urna fermentum vehicula. Quisque sed elit
non nibh ullamcorper lacinia. Orci varius natoque penatibus et magnis dis
parturient montes, nascetur ridiculus mus. Duis nibh ligula, scelerisque
porta rutrum ac, tempus vitae ipsum. Morbi ut ante a felis fringilla
aliquam bibendum nec felis. Donec vel nunc congue, rhoncus mauris quis,
malesuada nisi.`,
}
