import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeCustomProvider } from './contexts/ThemeContext';
import { LogBox } from 'react-native';
import useSocket from '@/utilities/hooks/useSocket';
import Register from './pages/register';
import Login from './pages/login';


LogBox.ignoreLogs([
  'Draggable: Support for defaultProps will be removed from function components',
]);


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useSocket();
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
    <QueryClientProvider client={queryClient}>
      <ThemeCustomProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeCustomProvider>
    </QueryClientProvider>
  );
}
