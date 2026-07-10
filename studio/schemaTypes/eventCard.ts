import {defineField, defineType} from 'sanity'

export const eventCard = defineType({
  name: 'eventCard',
  title: 'Event Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming Events (Flagship)', value: 'flagship'},
          {title: 'Programme Highlights', value: 'programme'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. 1 – 3 Dec 2026',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      initialValue: '#fb923c',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'e.g. XRAS, Hackathon, Esports',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link Path',
      type: 'string',
      description: 'Internal route, e.g. /xras-kl-2026',
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      initialValue: 'center',
      description: 'CSS object-position, e.g. center or 18% center',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured card',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isHero',
      title: 'Hero tile (programme grid)',
      description: 'Large spanning card in Programme Highlights grid',
      type: 'boolean',
      initialValue: false,
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
    select: {
      title: 'title',
      subtitle: 'section',
      media: 'image',
    },
  },
})
