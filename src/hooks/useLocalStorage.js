import { useState, useEffect } from "react";

const PREFIX = "chat-app-clone-"

   const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue);
            } catch (error) {
                console.error("Error parsing stored JSON:", error);
            }
        }

        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
};
export default useLocalStorage