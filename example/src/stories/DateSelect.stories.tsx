import { Centering, DateSelect } from '@solved-ac/ui-react'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/DateSelect',
  component: DateSelect,
  argTypes: {
    locale: {
      control: 'text',
      description: 'The locale to use',
    },
    weekStartsOn: {
      defaultValue: 0,
      options: [0, 1, 2, 3, 4, 5, 6],
      control: {
        type: 'select',
      },
      description: 'The day of the week to start on',
    },
    chunks: {
      defaultValue: 1,
      options: [1, 2, 3, 4, 5, 6],
      control: {
        type: 'select',
      },
      description: 'The number of months to display at once',
    },
    annotations: {
      control: 'array',
      description: 'The annotations to display',
      defaultValue: [],
    },
  },
} as Meta<typeof DateSelect>

type Story = StoryObj<typeof DateSelect>

export const Default: Story = {
  render: (args) => (
    <Centering>
      <DateSelect {...args} />
    </Centering>
  ),
}

const DAY = 1000 * 60 * 60 * 24

export const Annotations: Story = {
  render: (args) => (
    <Centering>
      <DateSelect {...args} />
    </Centering>
  ),
  args: {
    annotations: [
      {
        title: "I'm a title",
        color: '#e3f44f',
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 7).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#c1ecff',
        start: new Date(Date.now() - DAY * 17).toISOString().split('T')[0],
        end: new Date(Date.now() - DAY * 5).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#ffd2bd',
        start: new Date(Date.now() + DAY * 4).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 16).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#ffc8fb',
        start: new Date(Date.now() + DAY * 9).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 9).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#f9ffc1',
        start: new Date(Date.now() + DAY * 16).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 17).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#d7ffc0',
        start: new Date(Date.now() + DAY * 24).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 28).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#b9b7b4',
        start: new Date(Date.now() + DAY * 21).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 25).toISOString().split('T')[0],
      },
      {
        title: "I'm a title",
        color: '#ffcbcb',
        start: new Date(Date.now() + DAY * 34).toISOString().split('T')[0],
        end: new Date(Date.now() + DAY * 36).toISOString().split('T')[0],
      },
    ],
  },
}
