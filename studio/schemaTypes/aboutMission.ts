import {defineField, defineType} from 'sanity'

export const aboutMission = defineType({
  name: 'aboutMission',
  title: 'About — Our Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'titleHighlight',
      title: 'Title (highlighted part)',
      type: 'string',
      description: 'Shown with accent gradient, e.g. "Maximum reach."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRest',
      title: 'Title (remaining part)',
      type: 'string',
      description: 'e.g. "Minimum friction."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyHighlight',
      title: 'Body (highlighted sentence)',
      type: 'text',
      rows: 3,
      description: 'First sentence shown with accent styling',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyRest',
      title: 'Body (remaining text)',
      type: 'text',
      rows: 4,
      description: 'Continuation after the highlighted sentence (include "By …" if needed)',
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
    prepare({title, subtitle}) {
      return {
        title: title || 'Our Mission',
        subtitle: subtitle || 'About page section',
      }
    },
  },
})
