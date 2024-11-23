'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { login } from '@/services/authService';
import { LoginPayload } from '@/types';
import { LoginSchema } from '@/types/schemas';

type FormFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    console.log('onSubmit called');
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
        <div className="flex w-full flex-grow flex-col gap-2">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full rounded-md bg-powder-ash-100 px-3 py-2 text-sm text-dark-text placeholder-dark-text focus:outline-none"
            />
            {errors.email && (
              <span className="text-xxs text-accent">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Palavra-passe"
              className="w-full rounded-md bg-powder-ash-100 px-3 py-2 text-sm text-dark-text placeholder-dark-text focus:outline-none"
            />
            {errors.password && (
              <span className="text-xxs text-accent">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-md bg-deep-sea-400 p-3 text-sm font-semibold text-dark-text shadow-md transition duration-200 hover:bg-deep-sea-300"
          >
            Iniciar Sessão
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
