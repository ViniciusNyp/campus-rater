import { Header } from '../header/index';
import { ProtectedRoute } from '../protected-route';
import { Toaster } from '../ui/toaster';

export const getNoneLayout = (page: React.ReactElement) => page;

export const getUnauthenticatedLayout = (page: React.ReactElement) => {
	return (
		<div className="w-full min-h-screen">
			{page}
			<Toaster />
		</div>
	);
};

export const getAuthenticatedLayout = (page: React.ReactElement) => {
	return (
		<div className="w-full min-h-screen">
			<ProtectedRoute>
				<Header />
				{page}
				<Toaster />
			</ProtectedRoute>
		</div>
	);
};
