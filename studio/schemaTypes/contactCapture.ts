export default {
  name: 'contactCapture',
  title: 'Contact Capture',
  type: 'document',
  fields: [
    {name: 'email', type: 'string', title: 'Email', validation: (Rule: any) => Rule.required().email()},
    {name: 'phone', type: 'string', title: 'Phone'},
    {name: 'firstName', type: 'string', title: 'First Name'},
    {name: 'lastName', type: 'string', title: 'Last Name'},
    {
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'interests',
      type: 'array',
      title: 'Interests',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Opening Drop', value: 'opening_drop'},
          {title: 'AI Studio', value: 'ai_studio'},
          {title: 'Tales of Kuma', value: 'tales_of_kuma'},
          {title: 'Collectors', value: 'collectors'},
        ],
      },
    },
    {name: 'emailConsent', type: 'boolean', title: 'Email Consent', initialValue: false},
    {name: 'emailConsentText', type: 'text', title: 'Email Consent Text'},
    {name: 'emailConsentedAt', type: 'datetime', title: 'Email Consented At'},
    {name: 'smsConsent', type: 'boolean', title: 'SMS Consent', initialValue: false},
    {name: 'smsConsentText', type: 'text', title: 'SMS Consent Text'},
    {name: 'smsConsentedAt', type: 'datetime', title: 'SMS Consented At'},
    {name: 'sourcePage', type: 'string', title: 'Source Page'},
    {name: 'userAgent', type: 'string', title: 'User Agent'},
    {name: 'ipAddress', type: 'string', title: 'IP Address'},
    {name: 'createdAt', type: 'datetime', title: 'Created At'},
    {name: 'shopifyCustomerId', type: 'string', title: 'Shopify Customer ID'},
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
};
