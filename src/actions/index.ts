import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
      service: z.string().min(1),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    handler: async (input) => {
      // Simulate sending email or saving to DB
      console.log('Received contact form submission:', input);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    },
  }),
  bookAppointment: defineAction({
    accept: 'form',
    input: z.object({
      service: z.string().min(1, 'Service is required'),
      propertySize: z.string().min(1, 'Property size is required'),
      urgency: z.string().min(1, 'Urgency is required'),
      postcode: z.string().min(4, 'Valid postcode is required'),
      name: z.string().min(1, 'Name is required'),
      phone: z.string().min(10, 'Valid phone number is required'),
      email: z.string().email('Invalid email address'),
    }),
    handler: async (input) => {
      console.log('Received appointment booking:', input);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, appointment: input };
    },
  }),
};
