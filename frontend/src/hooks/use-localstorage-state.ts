import { useEffect, useState } from 'react';

type UseLocalStorageStateHook = [string | null, React.Dispatch<React.SetStateAction<string | null>>];

function useLocalStorageState(key: string, initialValue: string | null): UseLocalStorageStateHook {
	const [state, setState] = useState(() => {
		try {
			return localStorage.getItem(key);
		} catch (error) {
			console.error(`Unable to get value from localStorage for key "${key}":`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			state ? localStorage.setItem(key, state) : localStorage.removeItem(key);
		} catch (error) {
			console.error(`Unable to set value to localStorage for key "${key}":`, error);
		}
	}, [key, state]);

	return [state, setState];
}

export default useLocalStorageState;
