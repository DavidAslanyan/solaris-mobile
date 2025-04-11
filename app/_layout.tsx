import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeCustomProvider } from './contexts/ThemeContext';
import Store from './(tabs)/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Store />
    // <QueryClientProvider client={queryClient}>
    //   <ThemeCustomProvider>
    //     <Stack screenOptions={{ headerShown: false }}>
    //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //       <Stack.Screen name="+not-found" />
    //     </Stack>
    //     <StatusBar style="auto" />
    //   </ThemeCustomProvider>
    // </QueryClientProvider>
  );
}
