import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeCustomProvider } from './contexts/ThemeContext';
import Games from './(tabs)/games';
import Quiz from './pages/quiz';
import MissingWord from './pages/missing-word';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <MissingWord />
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
