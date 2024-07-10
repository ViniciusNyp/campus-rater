import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './providers/auth';
import { createRouter } from './router';

export default function App() {
	const { setToken } = useAuth();
	const queryClient = useMemo(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: (error) => {
						if (isAxiosError(error) && error.status === 401) {
							setToken(null);
						}
					},
				}),
				mutationCache: new MutationCache({
					onError: (error) => {
						if (isAxiosError(error) && error.status === 401) {
							setToken(null);
						}
					},
				}),
			}),
		[setToken],
	);
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={createRouter()} />
			</QueryClientProvider>
		</AuthProvider>
	);
}
