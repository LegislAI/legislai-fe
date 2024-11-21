import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Introduza um email válido' }),
  password: z
    .string()
    .min(8, { message: 'Tem de conter pelo menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Tem de conter pelo menos uma letra' })
    .regex(/[0-9]/, { message: 'Tem de conter pelo menos um número' })
    .trim(),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Tem de conter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Introduza um email válido' }),
  password: z
    .string()
    .min(8, { message: 'Tem de conter pelo menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Tem de conter pelo menos uma letra' })
    .regex(/[0-9]/, { message: 'Tem de conter pelo menos um número' })
    .trim(),
});
