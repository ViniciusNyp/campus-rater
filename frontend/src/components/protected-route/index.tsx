import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/providers/auth';

export const ProtectedRoute = ({ children }: { children: ReactNode }): ReactElement => {
	const { token, decodedToken, setToken } = useAuth();

	const navigate = useNavigate();

	if (!token) {
		navigate('/login');
	}

	if (!decodedToken?.exp || decodedToken.exp < Date.now() / 1000) {
		setToken(null);
		navigate('/login');
	}

	return <>{children}</>;
};
