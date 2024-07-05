import { JwtPayload } from 'jsonwebtoken';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo } from 'react';
import { serverApi } from 'src/config/server';
import useLocalStorageState from 'src/hooks/use-localstorage-state';

const AuthContext = createContext<{
	token?: string | null;
	decodedToken?: JwtPayload | null;
	setToken: Dispatch<SetStateAction<string | null>>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useLocalStorageState<string | null>('token', null);

	useEffect(() => {
		if (token) {
			serverApi.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			localStorage.setItem('token', token);
		} else {
			delete serverApi.defaults.headers.common['Authorization'];
			localStorage.removeItem('token');
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			//decodedToken: token ? decode(token, { json: true }) : null,
			setToken,
		}),
		[setToken, token],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
