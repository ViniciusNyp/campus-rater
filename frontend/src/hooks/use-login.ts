import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/components/ui/use-toast';
import { serverApi } from 'src/config/server';
import { LoginInput, LoginResponse } from 'src/domain/auth';
import { useAuth } from 'src/providers/auth';

async function login(input: LoginInput) {
	return await serverApi.post<LoginResponse>('authentication/token', input, {
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
	});
}

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { setToken } = useAuth();
	const { toast } = useToast();

	const { mutate: loginMutation } = useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError<{ detail?: string }>,
		LoginInput,
		unknown
	>(login, {
		onError: (e) => {
			toast({
				title: 'Ops.. Error on login. Try again!',
				description: e.response?.data?.detail,
				variant: 'destructive',
			});
		},
		onSuccess: (response) => {
			queryClient.setQueryData(['login'], response.data);
			setToken(response.data.access_token);
			navigate('/home');
		},
	});

	return loginMutation;
}
