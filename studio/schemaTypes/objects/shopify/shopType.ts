import {defineType} from 'sanity'

export const shopType = defineType({
  name: 'shop',
  title: 'Shop',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    {name: 'name', title: 'Store name', type: 'string'},
    {name: 'description', title: 'Description', type: 'string'},
    {name: 'shortDescription', title: 'Short description', type: 'string'},
    {name: 'currency', title: 'Currency', type: 'string'},
    {name: 'moneyFormat', title: 'Money format', type: 'string'},
    {name: 'moneyWithCurrencyFormat', title: 'Money with currency format', type: 'string'},
    {name: 'primaryDomain', title: 'Primary domain', type: 'url'},
    {name: 'storeDomain', title: 'Store domain', type: 'url'},
    {name: 'timezone', title: 'Timezone', type: 'string'},
    {name: 'ianaTimezone', title: 'IANA timezone', type: 'string'},
    {name: 'locale', title: 'Locale', type: 'string'},
    {name: 'country', title: 'Country', type: 'string'},
    {name: 'address1', title: 'Address 1', type: 'string'},
    {name: 'address2', title: 'Address 2', type: 'string'},
    {name: 'city', title: 'City', type: 'string'},
    {name: 'zip', title: 'ZIP code', type: 'string'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'email', title: 'Email', type: 'string'},
  ],
})
