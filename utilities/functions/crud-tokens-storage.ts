import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState } from '../types/auth.type';

export const USER_KEY = 'user';

export const storeUserInAsyncStorage = async (data: UserState) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

export const getUserFromAsyncStorage = async (): Promise<UserState | null> => {
  try {
    const stored = await AsyncStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading user from storage:', error);
    return null;
  }
};


export const saveTokensInSecureStorage = (accessToken: string, refreshToken: string) => {
  // secureLocalStorage.setItem(ACCESS_TOKEN, accessToken);
  // secureLocalStorage.setItem(REFRESH_TOKEN, refreshToken);
}


export const clearTokensFromSecureStorage = () => {
  // secureLocalStorage.removeItem(ACCESS_TOKEN);
  // secureLocalStorage.removeItem(REFRESH_TOKEN);
}


export const getAccessToken = () => {
  // return secureLocalStorage.getItem(ACCESS_TOKEN);
}


export const getRefreshToken = () => {
  // return secureLocalStorage.getItem(REFRESH_TOKEN);
}

