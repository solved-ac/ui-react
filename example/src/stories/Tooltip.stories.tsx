import { Button, Centering, Tooltip } from '@solved-ac/ui-react'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title to display',
      defaultValue: 'Tooltip',
    },
    noDefaultStyles: {
      control: 'boolean',
      description: 'Whether to use the default styles',
      defaultValue: false,
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show the arrow',
      defaultValue: true,
    },
    keepOpen: {
      control: 'boolean',
      description: 'Whether to keep the tooltip open',
      defaultValue: false,
    },
    place: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'The placement of the tooltip',
      defaultValue: 'top',
    },
    interactive: {
      control: 'boolean',
      description:
        'Whether to make the tooltip interactive - if set to true, the tooltip contents will receive pointer events',
      defaultValue: false,
    },
  },
} as Meta<typeof Tooltip>

const Template: StoryFn<typeof Tooltip> = (args) => (
  <Centering
    style={{
      height: 200,
    }}
  >
    <Tooltip {...args} />
  </Centering>
)

export const Default = Template.bind({})
Default.args = {
  children: <Button>Hover me!</Button>,
  title: 'Tooltip',
}
