'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { login } from '@/services/authService';
import { LoginPayload } from '@/types';

const schema = z.object({
  email: z.string().email({ message: 'Introduza um email válido.' }),
  password: z
    .string()
    .min(8, { message: 'Tem de conter pelo menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Tem de conter pelo menos uma letra.' })
    .regex(/[0-9]/, { message: 'Tem de conter pelo menos um número.' })
    .trim(),
});

type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const payload: LoginPayload = {
        email: data.email,
        password: data.password,
      };

      await login(payload);
      router.push('/');
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
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.email && (
            <span className="mt-1 text-xxs font-medium text-red-800">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Palavra-passe"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.password && (
            <span className="mt-1 text-xxs font-medium text-red-800">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-md bg-green-house-800 p-3 text-sm font-semibold text-light-green-50 shadow-md transition duration-200 hover:bg-green-house-900"
          >
            Iniciar Sessão
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;