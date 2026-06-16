import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactCapture',
  title: 'Contact Capture',
  type: 'document',
  fields: [
    defineField({name: 'email', type: 'string', title: 'Email', validation: (Rule) => Rule.required().email()}),
    defineField({name: 'phone', type: 'string', title: 'Phone'}),
    defineField({name: 'firstName', type: 'string', title: 'First Name'}),
    defineField({name: 'lastName', type: 'string', title: 'Last Name'}),
    defineField({
      name: 'source',
      type: 'string',
      title: 'Source',
      options: {
        list: [
          {title: 'Newsletter Footer', value: 'newsletter_footer'},
          {title: 'AI Studio Waitlist', value: 'ai_studio_waitlist'},
          {title: 'Homepage AI CTA', value: 'homepage_ai_cta'},
          {title: 'Account Preferences', value: 'account_preferences'},
          {title: 'Checkout', value: 'checkout'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'interests',
      type: 'array',
      title: 'Interests',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Opening Drop', value: 'opening_drop'},
          {title: 'AI Studio', value: 'ai_studio'},
          {title: 'Tales of Kuma', value: 'tales_of_kuma'},
          {title: 'Collectors', value: 'collectors'},
        ],
      },
    }),
    defineField({name: 'emailConsent', type: 'boolean', title: 'Email Consent', initialValue: false}),
    defineField({name: 'emailConsentText', type: 'text', title: 'Email Consent Text'}),
    defineField({name: 'emailConsentedAt', type: 'datetime', title: 'Email Consented At'}),
    defineField({name: 'smsConsent', type: 'boolean', title: 'SMS Consent', initialValue: false}),
    defineField({name: 'smsConsentText', type: 'text', title: 'SMS Consent Text'}),
    defineField({name: 'smsConsentedAt', type: 'datetime', title: 'SMS Consented At'}),
    defineField({name: 'sourcePage', type: 'string', title: 'Source Page'}),
    defineField({name: 'userAgent', type: 'string', title: 'User Agent'}),
    defineField({name: 'ipHash', type: 'string', title: 'IP Hash'}),
    defineField({name: 'createdAt', type: 'datetime', title: 'Created At'}),
    defineField({name: 'shopifyCustomerId', type: 'string', title: 'Shopify Customer ID'}),
  ],
  preview: {
    select: {
      email: 'email',
      source: 'source',
      createdAt: 'createdAt',
    },
    prepare({email, source, createdAt}: {email?: string; source?: string; createdAt?: string}) {
      return {
        title: email || 'No email',
        subtitle: `${source || 'unknown'} — ${createdAt ? new Date(createdAt).toLocaleDateString() : 'no date'}`,
      };
    },
  },
})
