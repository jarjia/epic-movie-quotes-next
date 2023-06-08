import z from 'zod';

const georgianRegex = /^[\u10A0-\u10FF0-9\s]+$/;
const englishRegex = /^[A-Za-z0-9\s]+$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'Name field is required' })
      .min(3, 'Name field should be at least 3 characters long')
      .max(15, "Name field shouldn't be more than 15 characters long")
      .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
        message:
          'Name field should only contain lowercase characters and numbers',
      }),
    email: z
      .string()
      .nonempty({ message: 'Email field is required' })
      .email('Email field should be valid email address'),
    password: z
      .string()
      .nonempty({ message: 'Password field is required' })
      .min(8, 'Password field should be at least 8 characters long')
      .max(15, "Password field shouldn't be more than 15 characters long")
      .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
        message:
          'Password field should only contain lowercase characters and numbers',
      }),
    confirm_password: z.string(),
  })
  .refine((schema) => schema.confirm_password === schema.password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export const LoginSchema = z.object({
  user: z
    .string()
    .nonempty({ message: 'This field is required' })
    .min(3, 'This field should be at least 3 characters long'),
  password: z.string().nonempty('Password field is required'),
});

export const RecoverEmailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email field is required' })
    .email('Email field should be valid email address'),
});

export const RecoverPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: 'Password field is required' })
      .min(8, 'Password field should be at least 8 characters long')
      .max(15, "Password field shouldn't be more than 15 characters long")
      .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
        message:
          'Password field should only contain lowercase characters and numbers',
      }),
    confirm_password: z.string(),
  })
  .refine((schema) => schema.confirm_password === schema.password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
export const UpdateProfileSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Username field should be at least 3 characters long.')
      .max(15, "Name field shouldn't be more than 15 characters long")
      .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
        message:
          'Name field should only contain lowercase characters and numbers',
      })
      .optional(),
    email: z
      .string()
      .email('Email field should be valid email address')
      .optional(),
    password: z
      .string()
      .nonempty({ message: 'Password field is required' })
      .min(8, 'Password field should be at least 8 characters long')
      .max(15, "Password field shouldn't be more than 15 characters long")
      .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
        message:
          'Password field should only contain lowercase characters and numbers',
      })
      .optional(),
    c_password: z.string().optional(),
  })
  .refine((schema) => schema.c_password === schema.password, {
    message: "Passwords don't match",
    path: ['c_password'],
  });

export const AddMovieSchema = z.object({
  movie: z.object({
    en: z
      .string()
      .nonempty({ message: 'Movie name in English is required' })
      .refine((value) => englishRegex.test(value), {
        message: 'Please enter movie name in english.',
      }),
    ka: z
      .string()
      .nonempty({ message: 'Movie name in Georgian is required' })
      .refine((value) => georgianRegex.test(value), {
        message: 'Please enter movie name in english.',
      }),
  }),
  description: z.object({
    en: z
      .string()
      .nonempty({ message: 'description in English is required' })
      .refine((value) => englishRegex.test(value), {
        message: 'Please enter description in english.',
      }),
    ka: z
      .string()
      .nonempty({ message: 'description in Georgian is required' })
      .refine((value) => georgianRegex.test(value), {
        message: 'Please enter description in english.',
      }),
  }),
  director: z.object({
    en: z
      .string()
      .nonempty({ message: 'director name in English is required' })
      .refine((value) => englishRegex.test(value), {
        message: 'Please enter director name in english.',
      }),
    ka: z
      .string()
      .nonempty({ message: 'director name in Georgian is required' })
      .refine((value) => georgianRegex.test(value), {
        message: 'Please enter director name in english.',
      }),
  }),
  genres: z
    .array(
      z.object({
        id: z.number().optional(),
      })
    )
    .min(1),
  releaseDate: z
    .string()
    .nonempty({ message: 'Movie release date field is required' }),
  thumbnail: z.any().refine((val) => val.length > 0, 'Movie image is required'),
});
