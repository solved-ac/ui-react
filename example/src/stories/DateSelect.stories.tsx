import { Centering, DateSelect } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/DateSelect',
  component: DateSelect,
  argTypes: {},
} as Meta<typeof DateSelect>

const Template: StoryFn<typeof DateSelect> = (args) => (
  <Centering>
    <DateSelect {...args} />
  </Centering>
)

export const Default = Template.bind({})
