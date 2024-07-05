import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from 'src/components/ui/use-toast';
import { serverApi } from 'src/config/server';
import { SignUpInput, SignUpResponse } from 'src/domain/auth';
import { useLogin } from './use-login';

async function signUp(input: SignUpInput) {
	return await serverApi.post<SignUpResponse>('user', input, {});
}

export function useSignUp() {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const loginMutation = useLogin();

	const { mutate: signUpMutation } = useMutation<
		AxiosResponse<SignUpResponse>,
		AxiosError<{ detail?: string }>,
		SignUpInput,
		unknown
	>(signUp, {
		onError: (e) => {
			toast({
				title: 'Ops.. Error on Sign Up. Try again!',
				description: e.response?.data?.detail,
				variant: 'destructive',
			});
		},
		onSuccess: (response, input) => {
			queryClient.setQueryData(['signUp'], response.data);
			loginMutation(input);
		},
	});

	return signUpMutation;
}
