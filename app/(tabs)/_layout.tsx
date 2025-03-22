import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeIcon from '@/components/icons/navbar-icons/HomeIcon';
import ShopIcon from '@/components/icons/navbar-icons/ShopIcon';
import ButtonStudy from '@/components/buttons/button-study/ButtonStudy';
import TabStudy from '@/components/buttons/tab-study/TabStudy';
import GameIcon from '@/components/icons/navbar-icons/GameIcon';
import ProfileIcon from '@/components/icons/navbar-icons/ProfileIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          paddingTop: 20,
          borderRadius: 10,
          height: 110
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <ShopIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="terms"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <View style={{position: 'relative', left: 10}}><TabStudy /></View>,
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <GameIcon color={color} width={30} height={30} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
