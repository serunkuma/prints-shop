export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [{type: 'navItem'}],
    },
  ],
  preview: {
    prepare: () => ({title: 'Main Navigation'}),
  },
};
