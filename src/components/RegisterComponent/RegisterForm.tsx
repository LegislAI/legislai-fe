'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { register as registerUser } from '@/services/authService';
import { RegisterPayload } from '@/types';

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Tem de conter pelo menos 3 caracteres.' }),
    email: z.string().email({ message: 'Introduza um email válido.' }),
    password: z
      .string()
      .min(8, { message: 'Tem de conter pelo menos 8 caracteres.' })
      .regex(/[a-zA-Z]/, { message: 'Tem de conter pelo menos uma letra.' })
      .regex(/[0-9]/, { message: 'Tem de conter pelo menos um número.' })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As passwords não coincidem.',
        path: ['confirmPassword'],
      });
    }
  });

type FormFields = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const payload: RegisterPayload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      await registerUser(payload);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <div>
          <input
            {...register('username')}
            type="text"
            placeholder="Nome"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.username && (
            <span className="text-xs text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirmar Password"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-md bg-green-house-800 p-3 text-sm font-semibold text-light-green-50 shadow-md transition duration-200 hover:bg-green-house-900"
        >
          Registar
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
