import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
	SERVER_HOST: z.coerce.string().default('localhost'),
	SERVER_PORT: z.coerce.number().default(3000),
	APP_PORT: z.coerce.number().default(5000),
	ENVIRONMENT: z.enum(['dev', 'prod']).default('dev'),
});

type EnvSchema = z.infer<typeof envSchema>;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends EnvSchema {}
	}
}

export const env = envSchema.parse(process.env);
