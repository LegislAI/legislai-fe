'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { register as registerUser } from '@/services/authService';
import { RegisterPayload } from '@/types';
import { RegisterSchema } from '@/types/schemas';

type FormFields = z.infer<typeof RegisterSchema>;

interface RegisterFormProps {
  handleFlipCard: () => void;
}

const RegisterForm = ({ handleFlipCard }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const payload: RegisterPayload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      await registerUser(payload);
      toast.success('Utilizador registado com sucesso.');

      reset();
      handleFlipCard();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-grow flex-col items-center justify-around gap-3"
    >
      <div className="flex w-full flex-grow flex-col gap-2">
        <div>
          <input
            {...register('username')}
            type="text"
            placeholder="Nome de Utilizador"
            className="w-full rounded-md bg-light-green-50 px-3 py-2 text-sm text-main-green-700 placeholder-main-green-700 focus:outline-none focus:ring-2 focus:ring-main-green-500"
          />
          {errors.username && (
            <span className="text-xxs text-red-600">
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
            <span className="text-xxs text-red-600">
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
            <span className="text-xxs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-md bg-green-house-800 p-3 text-sm font-semibold text-light-green-50 shadow-md transition duration-200 hover:bg-green-house-900"
      >
        Registar
      </button>
    </form>
  );
};

export default RegisterForm;
