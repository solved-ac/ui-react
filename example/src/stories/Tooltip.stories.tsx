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
    activateOnHover: {
      control: 'boolean',
      description: 'Whether to activate the tooltip on mouse hover',
      defaultValue: true,
    },
    activateOnClick: {
      control: 'boolean',
      description:
        'Whether to activate the tooltip on mouse click - repeated clicks will toggle the tooltip',
      defaultValue: false,
    },
    zIndex: {
      control: 'number',
      description: 'The z-index of the tooltip',
      defaultValue: 0,
    },
    noDefaultStyles: {
      control: 'boolean',
      description:
        'Whether to use the default styles - this will also disable the theme change.',
      defaultValue: false,
    },
    noThemeChange: {
      control: 'boolean',
      description:
        'Whether to prevent the theme from changing - Tooltip is set to use the dark theme by default. This will prevent that.',
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
