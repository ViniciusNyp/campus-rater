import { ReactElement, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/providers/auth';

export const ProtectedRoute = ({ children }: { children: ReactNode }): ReactElement => {
	const { decodedToken, setToken } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (!decodedToken || !decodedToken?.exp || decodedToken.exp <= Date.now() / 1000) {
			setToken(null);
			navigate('/login');
		}
	}, [decodedToken, navigate, setToken]);

	return <>{children}</>;
};
