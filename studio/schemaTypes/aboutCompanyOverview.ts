import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutCompanyOverview = defineType({
  name: 'aboutCompanyOverview',
  title: 'About — Company Overview',
  type: 'document',
  fields: [
    defineField({
      name: 'titleHighlight',
      title: 'Title (highlighted part)',
      type: 'string',
      description: 'Shown with accent gradient, e.g. "Connecting Innovators Across Asia\'s"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRest',
      title: 'Title (remaining part)',
      type: 'string',
      description: 'e.g. "Immersive Future"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'founderLine',
      title: 'Founder line',
      type: 'string',
      initialValue: 'Founded by Louis Clovis',
    }),
    defineField({
      name: 'active',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'titleHighlight', subtitle: 'titleRest'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Company Overview',
        subtitle: subtitle || 'About page section',
      }
    },
  },
})
