import {defineField, defineType} from 'sanity'

export const speaker = defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speakerType',
      title: 'Speaker Type',
      type: 'string',
      options: {
        list: [
          {title: 'Guest Speaker', value: 'guest'},
          {title: 'Sponsor Speaker', value: 'sponsor'},
        ],
        layout: 'radio',
      },
      initialValue: 'guest',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      description:
        'Guest speakers only. Used to resolve the country flag (e.g. Malaysia, Norway, India).',
      type: 'string',
      hidden: ({document}) => document?.speakerType === 'sponsor',
    }),
    defineField({
      name: 'countryFlag',
      title: 'Country Flag',
      description: 'Optional uploaded flag image for guest speakers. Overrides the URL fallback.',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => document?.speakerType === 'sponsor',
    }),
    defineField({
      name: 'countryFlagUrl',
      title: 'Country Flag URL (fallback)',
      description:
        'Optional public path or absolute URL (e.g. /country-flags/malaysia.png). Used when no flag image is uploaded.',
      type: 'url',
      hidden: ({document}) => document?.speakerType === 'sponsor',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      description: 'Sponsor speakers only. Shown in the speaker detail popup.',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => document?.speakerType !== 'sponsor',
    }),
    defineField({
      name: 'companyLogoUrl',
      title: 'Company Logo URL (fallback)',
      description: 'Optional public path or absolute URL when company logo is not uploaded yet.',
      type: 'url',
      hidden: ({document}) => document?.speakerType !== 'sponsor',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'photoUrl',
      title: 'Photo URL (fallback)',
      description:
        'Optional public path or absolute URL when photo is not uploaded yet (e.g. /speaker-pics/name.jpg)',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color, e.g. #ef783d',
      initialValue: '#ef783d',
    }),
    defineField({
      name: 'topic',
      title: 'Session Topic',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
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
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      company: 'company',
      speakerType: 'speakerType',
      media: 'photo',
    },
    prepare({title, company, speakerType, media}) {
      const typeLabel = speakerType === 'sponsor' ? 'Sponsor' : 'Guest'
      return {
        title,
        subtitle: [typeLabel, company].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
