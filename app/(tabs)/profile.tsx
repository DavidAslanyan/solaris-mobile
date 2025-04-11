import BellIcon from '@/components/icons/BellIcon';
import BookIcon from '@/components/icons/BookIcon';
import EditIcon from '@/components/icons/EditIcon';
import GobletIcon from '@/components/icons/GobletIcon';
import MoonIcon from '@/components/icons/MoonIcon';
import ExitIcon from '@/components/icons/navbar-icons/ExitIcon';
import HelpIcon from '@/components/icons/navbar-icons/HelpIcon';
import PolicyIcon from '@/components/icons/navbar-icons/PolicyIcon';
import PrizeIcon from '@/components/icons/PrizeIcon';
import ProgressIcon from '@/components/icons/ProgressIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import OptionTab from '@/components/option-tab';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemeText from '@/components/themes/theme-text';
import { Colors } from '@/constants/Colors';
import { determinePrize } from '@/utilities/functions/map-prizes';
import { selectFrameColor } from '@/utilities/functions/select-frame-color';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme, Appearance } from 'react-native'
import { useAppTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';

const Profile = () => {
  const data = {
    username: "David Aslanyan",
    imageUrl: require("@/assets/images/backgrounds/cover-1.jpg"),
    avatar: require("@/assets/images/user-avatars/male-1.png"),
    frame: 'def',
    points: 125,
    progress: 5
  }

  const { current } = determinePrize(data.points);

  const { theme, toggleTheme } = useAppTheme();

  const toggleAppTheme = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  }

  const iconColor = theme == 'dark' ? Colors.white : Colors.secondary;
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
      <Image
        source={data.imageUrl}
        style={{
          width: '100%',
          height: 250,
          zIndex: 0
        }}
      />
    }>

      <View style={styles.avatarContainer}>
        <View style={[
          styles.frame,
          { backgroundColor: selectFrameColor(data.frame) }
          ]}>
          <Image
            source={data.avatar}
            style={{
              width: 150,
              height: 150
            }}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <ThemeText weight='bold' size='xl'>{data.username}</ThemeText>
          <TouchableOpacity><EditIcon color={iconColor} /></TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <ThemeText size='lg'>XP Points: <ThemeText weight='bold' size='lg'>{data.points}</ThemeText></ThemeText>
          <View style={styles.progress}>
            <ProgressIcon color={iconColor} width={20} height={20} />
            <ThemeText size='lg'>Progress: <ThemeText weight='bold' size='lg'>{data.progress}</ThemeText></ThemeText>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{current.title}</Text>
          <View>{current.icon}</View>
        </View>
      </View>

      <View style={styles.list}>
        <OptionTab
          title='Dark Mode'
          icon={<MoonIcon color={iconColor} />}
          onPress={toggleTheme}
          isSwitch={true}
          switchVal={darkMode}
          onSwitchChange={toggleAppTheme}
        />
        <OptionTab
          title='Edit Profile'
          icon={<EditIcon color={iconColor} />}
          onPress={() => router.push('/pages/edit-profile')}
        />
        <OptionTab
          title='History'
          icon={<BookIcon color={iconColor} />}
          onPress={() => {}}
        />
        <OptionTab
          title='Leaderboard'
          icon={<PrizeIcon color={iconColor} />}
          onPress={() => {}}
        />
        <OptionTab
          title='Notifications'
          icon={<BellIcon color={iconColor} />}
          onPress={() => {}}
          isSwitch={true}
          switchVal={notifications}
          onSwitchChange={() => setNotifications(!notifications)}
        />
        <OptionTab
          title='Select Difficulty'
          onPress={() => {}}
        />
      </View>

      <View style={{ backgroundColor: Colors.thirdly, height: 2, margin: '4%', }} />
    
      <View style={styles.list}>
        <OptionTab
          title='About'
          icon={<HelpIcon color={iconColor} />}
          onPress={() => {}}
        />
        <OptionTab
          title='Policies'
          icon={<PolicyIcon color={iconColor} />}
          onPress={() => {}}
        />
        <OptionTab
          title='Delete Account'
          icon={<TrashIcon color={iconColor} />}
          onPress={() => {}}
        />
        <OptionTab
          title='Sign Out'
          icon={<ExitIcon color={iconColor} />}
          onPress={() => {}}
        />
      </View>
      
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    bottom: 15,
    gap: 10
  },

  avatarContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },

  frame: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center'
  },

  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 200,
    alignSelf: 'center'
  },

  title: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold'
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    alignSelf: 'center'
  },

  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  list: {
    gap: 10
  }
})

export default Profile;

