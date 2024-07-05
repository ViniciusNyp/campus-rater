import { ReactElement } from 'react';
import { createHashRouter } from 'react-router-dom';
import ErrorPage from './components/error-page';
import { getAuthenticatedLayout, getUnauthenticatedLayout } from './components/layout';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { SignUpPage } from './pages/signup';

export const routerObjects: {
	path: string;
	Component: () => JSX.Element;
	getLayout?: (page: React.ReactElement) => ReactElement;
}[] = [
	{
		path: '',
		Component: HomePage,
	},
	{
		path: 'login',
		Component: LoginPage,
		getLayout: getUnauthenticatedLayout,
	},
	{
		path: 'signup',
		Component: SignUpPage,
		getLayout: getUnauthenticatedLayout,
	},
];

export function createRouter(): ReturnType<typeof createHashRouter> {
	const routeWrappers = routerObjects.map((router) => {
		// @ts-ignore TODO: better type support
		const getLayout = router?.getLayout || getAuthenticatedLayout;
		const Component = router.Component;
		const page = getLayout(<Component />);
		return {
			...router,
			element: page,
			Component: null,
			ErrorBoundary: ErrorPage,
		};
	});
	return createHashRouter(routeWrappers);
}
