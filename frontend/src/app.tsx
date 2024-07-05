import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './providers/auth';
import { createRouter } from './router';

export default function App() {
	const queryClient = useMemo(() => new QueryClient({}), []);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={createRouter()} />
			</AuthProvider>
		</QueryClientProvider>
	);
}
