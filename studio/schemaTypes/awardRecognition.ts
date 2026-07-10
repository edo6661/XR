import {defineField, defineType} from 'sanity'

export const awardRecognition = defineType({
  name: 'awardRecognition',
  title: 'Award Recognition',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'event',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo URL (fallback)',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'ceremonyPhoto',
      title: 'Ceremony Photo',
      type: 'image',
    }),
    defineField({
      name: 'ceremonyPhotoUrl',
      title: 'Ceremony Photo URL (fallback)',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'ceremonyPhotoAlt',
      title: 'Ceremony Photo Alt',
      type: 'string',
    }),
    defineField({
      name: 'active',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'companyName', subtitle: 'event'},
  },
})
