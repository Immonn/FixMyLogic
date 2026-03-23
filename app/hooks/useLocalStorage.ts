import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
	const [value, setValue] = useState(() => {
		if (typeof window !== "undefined") {
			try {
				const item = window.localStorage.getItem(key);
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				console.warn("Error reading localStorage", error);
				return initialValue;
			}
		}
		return initialValue;
	});

	useEffect(() => {
		try {
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.warn("Error setting localStorage", error);
		}
	}, [key, value]);

	return [value, setValue] as const;
}
