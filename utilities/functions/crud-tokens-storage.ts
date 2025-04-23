import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState } from '../types/auth.type';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/global-data';

export const USER_KEY = 'user';


export const storeUserInAsyncStorage = async (data: UserState) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.log('Error saving user to storage:', error);
  }
};


export const getUserFromAsyncStorage = async (): Promise<UserState | null> => {
  try {
    const stored = await AsyncStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.log('Error reading user from storage:', error);
    return null;
  }
};


export const saveTokensInAsyncStorage = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
    await AsyncStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
  } catch(error) {
    console.log('Error saving tokens to storage:', error);
  }
}


export const getAccessToken = async () => {
  try {
    const stored = await AsyncStorage.getItem(ACCESS_TOKEN);
    return stored ? JSON.parse(stored) : null;
  } catch(error) {
    console.log('Error getting access token from storage:', error);
  }
}


export const getRefreshToken = async () => {
  try {
    const stored = await AsyncStorage.getItem(REFRESH_TOKEN);
    return stored ? JSON.parse(stored) : null;
  } catch(error) {
    console.log('Error getting refresh token from storage:', error);
  }
}


export const clearTokensFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
  } catch(error) {
    console.log('Error removing tokens from storage:', error);
  }
}
