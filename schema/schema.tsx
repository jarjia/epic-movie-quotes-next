import z from 'zod';

export const registerSchema = z
  .object({
    username: z
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
      .min(3, 'Password field should be at least 8 characters long')
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
