import z from 'zod';

const envSchema = z.object({
	VITE_SERVER_HOST: z.coerce.string().default('127.0.0.1'),
	VITE_SERVER_PORT: z.coerce.number().default(3000),
	VITE_CLIENT_PORT: z.coerce.number().default(5000),
	VITE_ENVIRONMENT: z.enum(['dev', 'prod']).default('dev'),
});

export const env = envSchema.passthrough().parse(process.env);
