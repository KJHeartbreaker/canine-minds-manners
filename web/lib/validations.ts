import {z} from 'zod'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

/**
 * Contact form validation schema
 */
export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().min(1, 'Email is required.').email('Invalid email address.'),
  phone: z.string().regex(phoneRegExp, `That doesn't look quite right!`).min(10).max(14).optional(),
  message: z.string().min(1, 'Message is required.'),
})

export type FormValues = z.infer<typeof validationSchema>
