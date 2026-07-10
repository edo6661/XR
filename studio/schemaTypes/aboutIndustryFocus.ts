import {defineField, defineType} from 'sanity'

export const aboutIndustryFocus = defineType({
  name: 'aboutIndustryFocus',
  title: 'About — Industry Focus',
  type: 'document',
  fields: [
    defineField({
      name: 'titlePrefix',
      title: 'Title prefix',
      type: 'string',
      initialValue: 'Where',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title (highlighted part)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRest',
      title: 'Title (remaining part)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
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
  },
})
