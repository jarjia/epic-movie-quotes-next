import { useTranslation } from 'next-i18next';
import z from 'zod';

const useZod = () => {
  const { t } = useTranslation('formErrors');
  const georgianRegex = /^[\u10A0-\u10FF0-9\s]+$/;
  const englishRegex = /^[A-Za-z0-9\s]+$/;

  const registerSchema = z
    .object({
      name: z
        .string()
        .nonempty({ message: t('register_name_req') as string })
        .min(3, t('register_name_min') as string)
        .max(15, t('register_name_max') as string)
        .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
          message: t('register_name_ref') as string,
        }),
      email: z
        .string()
        .nonempty({ message: t('register_email_req') as string })
        .email(t('register_email_mail') as string),
      password: z
        .string()
        .nonempty({ message: t('register_password_req') as string })
        .min(8, t('register_password_min') as string)
        .max(15, t('register_password_max') as string)
        .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
          message: t('register_password_ref') as string,
        }),
      confirm_password: z.string(),
    })
    .refine((schema) => schema.confirm_password === schema.password, {
      message: t('register_c_password') as string,
      path: ['confirm_password'],
    });

  const LoginSchema = z.object({
    user: z
      .string()
      .nonempty({ message: t('login_user_req') as string })
      .min(3, t('login_user_min') as string),
    password: z.string().nonempty(t('login_password') as string),
  });

  const RecoverEmailSchema = z.object({
    email: z
      .string()
      .nonempty({ message: t('register_email_req') as string })
      .email(t('register_email_mail') as string),
  });

  const RecoverPasswordSchema = z
    .object({
      password: z
        .string()
        .nonempty({ message: t('register_password_req') as string })
        .min(8, t('register_password_min') as string)
        .max(15, t('register_password_max') as string)
        .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
          message: t('register_password_ref') as string,
        }),
      confirm_password: z.string(),
    })
    .refine((schema) => schema.confirm_password === schema.password, {
      message: t('register_c_password') as string,
      path: ['confirm_password'],
    });
  const UpdateProfileSchema = z
    .object({
      name: z
        .string()
        .min(3, t('register_name_min') as string)
        .max(15, t('register_name_max') as string)
        .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
          message: t('register_name_ref') as string,
        })
        .optional(),
      email: z
        .string()
        .email(t('register_email_mail') as string)
        .optional(),
      password: z
        .string()
        .min(8, t('register_password_min') as string)
        .max(15, t('register_password_max') as string)
        .refine((schema) => /^[a-z0-9ა-ჰ]*$/.test(schema), {
          message: t('register_password_ref') as string,
        })
        .optional(),
      c_password: z.string().optional(),
    })
    .refine((schema) => schema.c_password === schema.password, {
      message: t('register_c_password') as string,
      path: ['c_password'],
    });

  const AddMovieSchema = z.object({
    movie: z.object({
      en: z
        .string()
        .nonempty({ message: t('movie_name_en_req') as string })
        .refine((value) => englishRegex.test(value), {
          message: t('movie_name_en_ref') as string,
        }),
      ka: z
        .string()
        .nonempty({ message: t('movie_name_ka_req') as string })
        .refine((value) => georgianRegex.test(value), {
          message: t('movie_name_ka_ref') as string,
        }),
    }),
    description: z.object({
      en: z
        .string()
        .nonempty({ message: t('movie_desc_en_req') as string })
        .refine((value) => englishRegex.test(value), {
          message: t('movie_desc_en_ref') as string,
        }),
      ka: z
        .string()
        .nonempty({ message: t('movie_desc_ka_req') as string })
        .refine((value) => georgianRegex.test(value), {
          message: t('movie_desc_ka_ref') as string,
        }),
    }),
    director: z.object({
      en: z
        .string()
        .nonempty({ message: t('movie_director_en_req') as string })
        .refine((value) => englishRegex.test(value), {
          message: t('movie_director_en_ref') as string,
        }),
      ka: z
        .string()
        .nonempty({ message: t('movie_director_ka_req') as string })
        .refine((value) => georgianRegex.test(value), {
          message: t('movie_director_ka_ref') as string,
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
      .nonempty({ message: t('movie_release_date') as string }),
    thumbnail: z
      .any()
      .refine((val) => val.length > 0, t('movie_image') as string),
  });

  return {
    registerSchema,
    LoginSchema,
    AddMovieSchema,
    UpdateProfileSchema,
    RecoverEmailSchema,
    RecoverPasswordSchema,
  };
};

export default useZod;
