export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {name: 'siteName', title: 'Site Name', type: 'string'},
    {name: 'siteDescription', title: 'Site Description', type: 'string'},
    {
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {name: 'enabled', title: 'Enabled', type: 'boolean'},
        {name: 'text', title: 'Text', type: 'string'},
        {name: 'link', title: 'Link', type: 'url'},
      ],
    },
    {
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      of: [{type: 'navItem'}],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'facebook', title: 'Facebook', type: 'url'},
      ],
    },
    {name: 'defaultSeo', title: 'Default SEO', type: 'seoFields'},
    {
      name: 'cookieBanner',
      title: 'Cookie Banner',
      type: 'object',
      fields: [
        {name: 'enabled', title: 'Enabled', type: 'boolean'},
        {name: 'text', title: 'Text', type: 'portableText'},
      ],
    },
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
};
