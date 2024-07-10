import { decodeJwt } from 'jose';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo } from 'react';
import { serverApi } from 'src/config/server';
import { TokenData } from 'src/domain/auth';
import useLocalStorageState from 'src/hooks/use-localstorage-state';

const AuthContext = createContext<{
	token: string | null;
	decodedToken: TokenData | null;
	setToken: Dispatch<SetStateAction<string | null>>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useLocalStorageState('token', null);

	useEffect(() => {
		if (token) {
			serverApi.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			setToken(token);
		} else {
			delete serverApi.defaults.headers.common['Authorization'];
			setToken(null);
		}
	}, [setToken, token]);

	const contextValue = useMemo(
		() => ({
			token,
			decodedToken: token ? decodeJwt<TokenData>(token) : null,
			setToken,
		}),
		[setToken, token],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
