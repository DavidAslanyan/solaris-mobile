import BellIcon from '@/components/icons/BellIcon';
import BookIcon from '@/components/icons/BookIcon';
import EditIcon from '@/components/icons/EditIcon';
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
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';
import Popup from '@/components/popup';
import FailIcon from '@/components/icons/FailIcon';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import ButtonMainSmall from '@/components/buttons/button-main-small';
import SelectDifficulty from '@/components/select-difficulty/SelectDifficulty';
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';


enum PopupOption {
  signOut = "signOut",
  deleteAccount = "deleteAccount"
};

const Profile = () => {  
  const data = {
    username: "David Aslanyan",
    imageUrl: require("@/assets/images/backgrounds/cover-1.jpg"),
    avatar: require("@/assets/images/user-avatars/male-1.png"),
    frame: 'def',
    points: 125,
    progress: 5,
    difficultyLevel: DifficultyLevel.EASY
  }

  const { current } = determinePrize(data.points);
  const { theme, toggleTheme } = useAppTheme();

  const toggleAppTheme = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  const iconColor = theme == 'dark' ? Colors.white : Colors.secondary;
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [difficultyPopupOpen, setDifficultyPopupOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupOption | null>(null);

  const handlePopupPress = () => {
    if (popup === PopupOption.signOut) {
      try {
        // logout();
        console.log('sigout')
        router.replace('/pages/login');
      } catch(error) {
        console.log("Failed to sign out", error);
      }
    }
    if (popup === PopupOption.deleteAccount) {
      try {
        // deleteUser();
        router.replace('/pages/register');
      } catch(error) {
        console.log("Failed to delete user", error);
      }
    }
  }

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
          onPress={() => router.push('/pages/leaderboard')}
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
          onPress={() => setDifficultyPopupOpen(true)}
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
          onPress={() => setPopup(PopupOption.deleteAccount)}
        />
        <OptionTab
          title='Sign Out'
          icon={<ExitIcon color={iconColor} />}
          onPress={() => setPopup(PopupOption.signOut)}
        />
      </View>


      <Popup isOpen={popup !== null} setIsOpen={() => {}}>
        <View style={styles.popupContainer}>
          {popup === PopupOption.deleteAccount 
          ? <FailIcon width={120} height={120} color={Colors.red} /> 
          : <ExitIcon color={theme === 'dark' ? Colors.white : Colors.secondary} width={80} height={80} />
          }
          <ThemeText style={{textAlign: 'center', paddingVertical: 10}} size='md' weight='medium'>Are you sure you want to {popup === PopupOption.deleteAccount ? " delete your account" : " sign out"}
          ?</ThemeText>
          <View style={styles.buttonContainer}>
            <ButtonSecondarySmall onPress={() => setPopup(null)} title='Cancel' />
            <ButtonMainSmall onPress={handlePopupPress} title={popup === PopupOption.deleteAccount ? "Delete My Account" : "Sign Out"} />
          </View>
        </View>
      </Popup>

      <Popup isOpen={difficultyPopupOpen} setIsOpen={setDifficultyPopupOpen}>
        <SelectDifficulty 
          difficulty={data.difficultyLevel}
          setDifficultyPopupOpen={setDifficultyPopupOpen}
        />
      </Popup>
      
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
    gap: 10,
    paddingBottom: 10
  },
  popupContainer: {
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})

export default Profile;

