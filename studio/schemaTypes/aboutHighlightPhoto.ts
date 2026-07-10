import {defineField, defineType} from 'sanity'

export const aboutHighlightPhoto = defineType({
  name: 'aboutHighlightPhoto',
  title: 'About Highlight Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Internal label for Studio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (fallback)',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'fit',
      title: 'Image Fit',
      type: 'string',
      options: {
        list: [
          {title: 'Contain', value: 'contain'},
          {title: 'Cover', value: 'cover'},
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'caption', media: 'image'},
  },
})
