import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль')
});

export const orderEditSchema = z.object({
  status: z.enum(['new', 'in_progress', 'done', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high']),
  deadline: z.string().min(1, 'Укажите дату'),
  comment: z.string().optional()
});