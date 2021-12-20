export const getDataFromLocalStorage = <T>(key: string, defaultValue: T): T =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));

export const setDataFromLocalStorage = <T>(key: string, data: T): void =>
    localStorage.setItem(key, JSON.stringify(data));

export const deleteDataFromLocalStorage = (key: string): void => localStorage.removeItem(key);
