import { LocalStorageService } from "./localStorageService";
export const getLocalStorageValue = (globalState: any): string => {
    let storageManager = new LocalStorageService(globalState);
    const val: string = storageManager.getValue<string>('selectedUIFramework');
    return val;
};