import {BsCalendarDate as icon} from 'react-icons/bs'
import {defineField, defineType} from 'sanity'
import {AcuityIdInput} from '../../../components/DateTimeV2Input'
import {AvailabilityCalculator} from '../../../components/AvailabilityCalculator'

export const dateTimeV2 = defineType({
  title: 'Date Time (New)',
  name: 'dateTimeV2',
  type: 'object',
  icon,
  options: {columns: 1}, // Single column layout for better alignment
  fieldsets: [
    {
      name: 'spots',
      title: 'Spots',
      options: {
        columns: 2, // Two columns for this fieldset
        collapsible: false, // Don't show as collapsible section
      },
    },
  ],
  initialValue: {
    availability: 'open',
  },
  fields: [
    defineField({
      title: 'Date and Time',
      name: 'dateTime',
      type: 'datetime',
      description: 'Select the date and time for this class session',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'h:mm A',
        timeStep: 15,
        displayTimeZone: 'America/Edmonton', // Adjust timezone as needed
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Acuity Appointment Type ID',
      name: 'acuityId',
      type: 'string',
      description:
        'Paste the Acuity embed snippet or button code, and the ID will be extracted automatically',
      components: {
        input: AcuityIdInput,
      },
    }),
    defineField({
      title: 'Total Spots',
      name: 'totalSpots',
      type: 'number',
      description: 'Total number of spots available for this class session',
      fieldset: 'spots',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      title: 'Bookings Count',
      name: 'bookingsCount',
      type: 'number',
      description:
        'Number of spots currently booked. This can be updated manually or automatically via webhook.',
      fieldset: 'spots',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      title: 'Availability',
      type: 'string',
      name: 'availability',
      description:
        'Automatically calculated based on bookings vs total spots. Can be manually overridden if needed.',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Nearly Full', value: 'nearlyFull'},
          {title: 'Full', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'open',
      components: {
        input: AvailabilityCalculator,
      },
    }),
  ],
  preview: {
    select: {
      dateTime: 'dateTime',
      acuityId: 'acuityId',
      subtitle: 'availability',
    },
    prepare({dateTime, acuityId, subtitle}) {
      const displayDateTime = dateTime
        ? new Date(dateTime).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : 'No date set'

      return {
        title: displayDateTime,
        subtitle: acuityId ? `Acuity ID: ${acuityId}` : subtitle,
      }
    },
  },
})
