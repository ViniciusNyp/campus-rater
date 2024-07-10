import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from 'src/hooks/use-login';
import { useAuth } from 'src/providers/auth';

import { z } from 'zod';

const loginFormSchema = z.object({
	username: z.string().trim().min(1, { message: 'Username or email is required' }).or(z.string().email()),
	password: z.string().trim().min(1, { message: 'Password is required' }),
});

export function LoginPage() {
	const { t } = useTranslation('translation');
	const navigate = useNavigate();
	const { token } = useAuth();
	const loginMutation = useLogin();
	const loginForm = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof loginFormSchema>) => loginMutation(values);

	useEffect(() => {
		if (token) {
			navigate('/home');
		}
	}, [navigate, token]);

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="flex flex-col items-center justify-center h-full py-12">
				<img
					src="../../../public/logo.svg"
					alt="Campus Rater Icon"
					className="absolute top-0 left-0 p-4 max-h-28"
				/>
				<div className="mx-auto  grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<Form {...loginForm}>
						<form className="grid gap-4" onSubmit={loginForm.handleSubmit(onSubmit)}>
							<FormField
								control={loginForm.control}
								name="username"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Username or email</FormLabel>
										<FormControl>
											<Input placeholder="username" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={loginForm.control}
								name="password"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<div className="flex items-center">
											<FormLabel>Password</FormLabel>
											<Link to="#" className="inline-block ml-auto text-sm underline">
												Forgot your password?
											</Link>
										</div>
										<FormControl>
											<Input placeholder="*********" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
					</Form>
					<div className="mt-4 text-sm text-center">
						Don&apos;t have an account?{' '}
						<Link to="/signup" className="underline">
							Sign up
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<img
					src="../../../public/cover.jpeg"
					alt="Campus Rater cover image, displaying a campus with students"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
