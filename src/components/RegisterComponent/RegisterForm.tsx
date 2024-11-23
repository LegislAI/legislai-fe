'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

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
      className="flex w-full flex-col gap-2"
    >
      <div className="flex w-full flex-grow flex-col gap-2">
        <div>
          <input
            {...register('username')}
            type="text"
            placeholder="Nome de Utilizador"
            className="w-full rounded-md bg-powder-ash-100 px-3 py-2 text-sm text-dark-text placeholder-dark-text focus:outline-none"
          />
          {errors.username && (
            <span className="text-xxs text-accent">
              {errors.username.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-powder-ash-100 px-3 py-2 text-sm text-dark-text placeholder-dark-text focus:outline-none"
          />
          {errors.email && (
            <span className="text-xxs text-accent">{errors.email.message}</span>
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-md bg-deep-sea-400 p-3 text-sm font-semibold text-dark-text shadow-md transition duration-200 hover:bg-deep-sea-300"
      >
        Registar
      </button>
    </form>
  );
};

export default RegisterForm;
