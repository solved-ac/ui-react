import { Typo, TypoVariant } from '@solved-ac/ui-react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

export default {
  title: 'Typo',
  component: Typo,
  argTypes: {
    children: {
      control: 'text',
      description: 'The text to display',
    },
    variant: {
      control: {
        type: 'select',
        options: ['description', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
      description: 'The variant of the text',
    },
    size: {
      control: {
        type: 'select',
        options: ['normal', 'small', 'smaller'],
      },
      description: 'The size of the text',
    },
    as: {
      control: { type: 'select', options: ['div', 'span', 'button', 'a'] },
      description: 'The element to render the card as',
    },
  },
} as ComponentMeta<typeof Typo>

const Template: ComponentStory<typeof Typo> = (args) => <Typo {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Typography',
}

const generateVariantTemplate = (
  variant: TypoVariant | TypoVariant[],
  text?: string
) => {
  const GeneratedTemplate = Template.bind({})
  GeneratedTemplate.args = {
    children: text
      ? `Typography — ${variant} — ${text}`
      : `Typography — ${variant}`,
    variant,
  }
  return GeneratedTemplate
}

export const Description = generateVariantTemplate('description')
export const Heading1 = generateVariantTemplate('h1')
export const Heading2 = generateVariantTemplate('h2')
export const Heading3 = generateVariantTemplate('h3')
export const Heading4 = generateVariantTemplate('h4')
export const Heading5 = generateVariantTemplate('h5')
export const Small = generateVariantTemplate('small')
export const Smaller = generateVariantTemplate('smaller')
export const Tabular = generateVariantTemplate('tabular', '$8,481.00')
export const Readable = generateVariantTemplate('readable', 'i1Il0O3469')
export const MultipleVariants = generateVariantTemplate([
  'small',
  'description',
])
