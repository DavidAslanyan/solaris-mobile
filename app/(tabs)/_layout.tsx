import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import HomeIcon from '@/components/icons/navbar-icons/HomeIcon';
import ShopIcon from '@/components/icons/navbar-icons/ShopIcon';
import TabStudy from '@/components/buttons/tab-study/TabStudy';
import GameIcon from '@/components/icons/navbar-icons/GameIcon';
import ProfileIcon from '@/components/icons/navbar-icons/ProfileIcon';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 20,
          height: 100,
          backgroundColor: Colors.secondary,
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
          tabBarIcon: () => <TouchableOpacity onPress={() => router.push('/pages/terms')}><TabStudy /></TouchableOpacity>,
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
