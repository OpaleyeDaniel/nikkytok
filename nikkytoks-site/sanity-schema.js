/**
 * NIKKYTOKS VENTURES — Sanity Studio Schema Definitions
 * 
 * Drop these schemas into your Sanity Studio project (e.g. schemas/product.js and schemas/settings.js)
 * when you are ready to manage all industrial inventory directly from Sanity CMS.
 */

export const productSchema = {
  name: 'product',
  title: 'Equipment & Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required().max(150),
      description: 'e.g. Elepaq Generator 10kVA, Nexans 16mm Armoured Cable, INGCO Impact Drill'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'category',
      title: 'Equipment Category',
      type: 'string',
      options: {
        list: [
          { title: 'Power Generation', value: 'Power Generation' },
          { title: 'Engineering & Hand Tools', value: 'Engineering & Hand Tools' },
          { title: 'Power Tools', value: 'Power Tools' },
          { title: 'Cables & Wiring', value: 'Cables & Wiring' },
          { title: 'Water Pumps', value: 'Water Pumps' },
          { title: 'Lubricants & Engine Oil', value: 'Lubricants & Engine Oil' },
          { title: 'Industrial & General', value: 'Industrial & General' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'brand',
      title: 'Manufacturer / OEM Brand',
      type: 'string',
      description: 'e.g. Elepaq, Mikano, Sumec Firman, INGCO, Bosch, Nexans, Total Quartz, Valvoline'
    },
    {
      name: 'description',
      title: 'Customer-Facing Overview',
      type: 'text',
      rows: 3,
      description: 'Concise summary of product capabilities, copper windings, and applications.'
    },
    {
      name: 'specs',
      title: 'Technical Specifications',
      type: 'text',
      rows: 2,
      description: 'Detailed specs (e.g. Rating: 10kVA | 100% Copper Windings | Key Start | AVR | 220V/50Hz)'
    },
    {
      name: 'image',
      title: 'Product High-Resolution Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'icon',
      title: 'Vector Icon Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Lightning / Zap (Generators)', value: 'zap' },
          { title: 'Sun (Solar & Inverters)', value: 'sun' },
          { title: 'Tools (Drills & Power Tools)', value: 'tools' },
          { title: 'Wrench (Hand Tools)', value: 'wrench' },
          { title: 'Plug / Cable (Wiring)', value: 'plug' },
          { title: 'Droplet (Water Pumps)', value: 'droplet' },
          { title: 'Oil Can (Lubricants)', value: 'oil' },
          { title: 'Factory / Gear (Industrial)', value: 'factory' }
        ]
      },
      initialValue: 'package'
    },
    {
      name: 'featured',
      title: 'Feature on Homepage Highlights',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'available',
      title: 'Currently in Stock & Ready for Dispatch',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image'
    }
  }
};

export const settingsSchema = {
  name: 'siteSettings',
  title: 'Corporate & Hub Settings',
  type: 'document',
  fields: [
    {
      name: 'whatsapp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      description: 'International format without spaces, e.g. 2348028278993'
    },
    {
      name: 'phone',
      title: 'Primary Phone Hotline',
      type: 'string',
      description: 'e.g. 08028278993'
    },
    {
      name: 'phone2',
      title: 'Secondary Phone Hotline',
      type: 'string',
      description: 'e.g. 08124002501'
    },
    {
      name: 'email',
      title: 'Procurement Email Address',
      type: 'string',
      description: 'e.g. sales@nikkytoksventures.com'
    },
    {
      name: 'hours',
      title: 'Warehouse Operating Hours',
      type: 'string',
      description: 'e.g. Mon – Sat: 8:00 AM – 6:30 PM'
    },
    {
      name: 'head',
      title: 'Head Office Address',
      type: 'string',
      description: 'e.g. 17 Ifelodun Street, Ilasamaja, Oshodi-Isolo, Lagos'
    },
    {
      name: 'branch',
      title: 'Island Branch Address',
      type: 'string',
      description: 'e.g. Shop 10, Alahun Bus Stop, Ibeju Lekki, Lagos'
    }
  ]
};

export default [productSchema, settingsSchema];
