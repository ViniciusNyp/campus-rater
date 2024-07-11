import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form';
import { useSignUp } from 'src/hooks/use-sign-up';
import { useAuth } from 'src/providers/auth';
import { z } from 'zod';

const signUpFormSchema = z.object({
	full_name: z.string().trim().min(1, { message: 'Full name is required' }),
	username: z.string().trim().min(1, { message: 'Username is required' }),
	email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
	password: z
		.string()
		.trim()
		.min(1, { message: 'Password is required' })
		.min(8, { message: 'Password need to be at least 8 characters' }),
});

export function SignUpPage() {
	const signUpMutation = useSignUp();

	const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			username: '',
			password: '',
			email: '',
			full_name: '',
		},
	});

	const onSubmit = (values: z.infer<typeof signUpFormSchema>) => signUpMutation(values);

	const navigate = useNavigate();
	const { token } = useAuth();
	useEffect(() => {
		if (token) {
			navigate('/home');
		}
	}, [navigate, token]);

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="flex flex-col items-center justify-center h-full py-12">
				<img
					src="logo.svg"
					alt="Campus Rater Icon"
					className="absolute top-0 left-0 p-4 max-h-28"
				/>
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Sign Up</h1>
						<p className="text-balance text-muted-foreground">
							Enter your information to create an account
						</p>
					</div>
					<Form {...signUpForm}>
						<form className="grid gap-4" onSubmit={signUpForm.handleSubmit(onSubmit)}>
							<FormField
								control={signUpForm.control}
								name="full_name"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Full name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={signUpForm.control}
								name="username"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="john.doe" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={signUpForm.control}
								name="email"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@example.com" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={signUpForm.control}
								name="password"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="*********" {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Create an account
							</Button>
						</form>
					</Form>
					<div className="mt-4 text-sm text-center">
						Already have an account?{' '}
						<Link to="/login" className="underline">
							Login
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<img
					src="cover.jpeg"
					alt="Campus Rater cover image, displaying a campus with students"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
