import { Storage } from '@capacitor/storage';

export const setObject = async (key: string, value: Object) => {
    await Storage.set({
        key,
        value: JSON.stringify(value)
    });
};

export const getObject = async <T>(key: string): Promise<T | null> => {
    const value = (await Storage.get({key})).value;
    if (value) {
        return JSON.parse(value) as T;
    }
    return null;
};

export const setItem = async (key: string, value: string) => {
    await Storage.set({
        key,
        value
    });
};

export const getItem = async (key: string): Promise<string | null> => {
    return (await Storage.get({key})).value;
};

export const remove = async (key: string) => {
    await Storage.remove({key});
}

export const keys = async (): Promise<string[]> => {
    const { keys } = await Storage.keys();
    return keys;
}

export const clear = async () => {
    await Storage.clear();
}