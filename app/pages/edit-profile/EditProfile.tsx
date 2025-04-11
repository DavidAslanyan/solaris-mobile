import { View, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppTheme } from '@/app/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { selectFrameColor } from '@/utilities/functions/select-frame-color';
import ButtonEdit from '@/components/buttons/button-edit';
import InputCustom from '@/components/input-custom/InputCustom';
import EmailIcon from '@/components/icons/EmailIcon';
import LockIcon from '@/components/icons/LockIcon';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import ButtonMainSmall from '@/components/buttons/button-main-small';
import ThemeText from '@/components/themes/theme-text';
import Popup from '@/components/popup';
import AvatarCloset from '@/components/closets/avatar-closet';
import { BACKGROUNDS, FRAMES } from '@/constants/shop-items';
import { filterAvatar } from '@/utilities/functions/filter-avatars';
import BackgroundCloset from '@/components/closets/background-closet';
import FrameCloset from '@/components/closets/frame-closet';


const profileData = {
  id: "6cadc416-677a-4aaf-8a69-fdbf53b8d761",
  avatarURL: "/user-avatars/male-1.png",
  frame: "def",
  purchasedAvatars: [
     "/user-avatars/male-1.png",
     "/user-avatars/female-1.png",
     "/user-avatars/male-2.png",
     "/user-avatars/female-2.png",
     "/user-avatars/male-3.png",
     "/user-avatars/female-3.png",
     "/user-avatars/limited-1.png",
     "/user-avatars/limited-2.png",
     "/user-avatars/limited-3.png",
     "/user-avatars/limited-4.png",
     "/user-avatars/limited-5.png",
     "/user-avatars/limited-6.png",
  ],
  purchasedBackgrounds: [
    BACKGROUNDS.def,
    BACKGROUNDS.cover1,
    BACKGROUNDS.cover2,
    BACKGROUNDS.cover3,
    BACKGROUNDS.cover4,
    BACKGROUNDS.cover5,
    BACKGROUNDS.cover6,
    BACKGROUNDS.cover7,
    BACKGROUNDS.cover8,
    BACKGROUNDS.cover9,
  ],
  purchasedFrames: [
    FRAMES.def, 
    FRAMES.black, 
    FRAMES.red, FRAMES.blue, FRAMES.lightBlue, FRAMES.orange, FRAMES.purple,
    FRAMES.yellow, FRAMES.pink, FRAMES.teal, FRAMES.lime, FRAMES.indigo, FRAMES.rose,
    FRAMES.amber, FRAMES.cyan, FRAMES.emerald, FRAMES.violet
  ],
  coins: 75,
  backgroundUrl: BACKGROUNDS.cover2,
  rang: "Student",
  rangURL: "/rangs/rang-1.png",
  firstName: "David",
  lastName: "Aslanyan",
  email: "david@gmail.com",
  progress: 150,
};

const EditProfile = () => {
  const data = {
    firstName: "David",
    lastName: "Aslanyan",
    email: "dav@gmail.com",
    avatar: filterAvatar(profileData.purchasedAvatars[0]),
    background: require("@/assets/images/backgrounds/cover-1.jpg"),
    frame: 'def',
    points: 125,
    progress: 5
  }
  const { theme } = useAppTheme();
  const iconColor = theme == 'dark' ? Colors.white : Colors.secondary;

  const initialState = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    password: "",
    newPassword: "",
    avatar: data?.avatar,
    frame: data?.frame,
    background: data?.background
  };

  const [formData, setFormData] = useState(initialState);
  const [avatar, setAvatar] = useState(data?.avatar);
  const [frame, setFrame] = useState(data?.frame);
  const [background, setBackground] = useState(data?.background);
  
  const [avatarPopupOpen, setAvatarPopupOpen] = useState<boolean>(false);
  const [framePopupOpen, setFramePopupOpen] = useState<boolean>(false);
  const [backgroundPopupOpen, setBackgroundPopupOpen] = useState<boolean>(false);
  const [formSubmitPopupOpen, setFormSubmitPopupOpen] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState<string>("");
  const [canUpdate, setCanUpdate] = useState<boolean>(false);

  useEffect(() => {
    const hasChanges =
      formData.firstName !== initialState.firstName ||
      formData.lastName !== initialState.lastName ||
      formData.email !== initialState.email ||
      formData.password !== "" ||
      formData.newPassword !== "" ||
      avatar !== initialState.avatar ||
      frame !== initialState.frame ||
      background !== initialState.background;
  
    setCanUpdate(hasChanges);
  }, [formData, avatar, frame, background]);

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
    setAvatar(initialState.avatar);
    setFrame(initialState.frame);
    setBackground(initialState.background);
  };


  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
      <Image
        source={background}
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
          { backgroundColor: selectFrameColor(frame) }
          ]}>
          <Image
            source={avatar}
            style={{
              width: 150,
              height: 150
            }}
          />
        </View>
      </View>

      <ThemeText size='lg' weight='semibold' style={{paddingLeft: '2%'}}>Edit Profile</ThemeText>
      
      <View style={styles.buttons}>
        <ButtonEdit title='Avatar' onPress={() => setAvatarPopupOpen(true)} />
        <ButtonEdit title='Frame' onPress={() => setFramePopupOpen(true)} />
        <ButtonEdit title='Background' onPress={() => setBackgroundPopupOpen(true)} maxWidth={150} />
      </View>

      <View style={styles.inputs}>
        <View style={styles.inputsTop}>
          <View style={styles.input}>
            <InputCustom 
              maxLength={25}
              onChange={(text) => handleFormChange('firstName', text)}
              value={formData.firstName}
              label="First Name"
              placeholder="John"
            />
          </View>

          <View style={styles.input}>
            <InputCustom 
              maxLength={25}
              onChange={(text) => handleFormChange('lastName', text)}
              value={formData.lastName}
              label="Last Name"
              placeholder="Doe"
              />
          </View>
        </View>
      
        <InputCustom
          maxLength={120}
          onChange={(text) => handleFormChange('email', text)}
          value={formData.email}
          label="Email"
          icon={<EmailIcon color={iconColor} />}
          placeholder="example@gmail.com"
        />

        <InputCustom
          isPassword={true}
          onChange={(text) => handleFormChange('password', text)}
          value={formData.password}
          label="Password"
          icon={<LockIcon color={iconColor} />}
        />

        <InputCustom
          isPassword={true}
          onChange={(text) => handleFormChange('newPassword', text)}
          value={formData.newPassword}
          label="Confirm Password"
          icon={<LockIcon color={iconColor} />}
        />
      </View>

      <View style={styles.mainButtons}>
        <ButtonSecondarySmall onPress={handleReset} title='Reset' />
        <ButtonMainSmall disabled={!canUpdate} onPress={() => setFormSubmitPopupOpen(true)} title='Save Changes' />
      </View>
      
      <Popup
        isOpen={avatarPopupOpen}
        setIsOpen={setAvatarPopupOpen}
        >
        {avatar &&
          <AvatarCloset  
            avatar={avatar}
            setAvatar={setAvatar}
            setPopup={setAvatarPopupOpen}
            purchasedAvatars={profileData.purchasedAvatars}
          />
        }
      </Popup>

      <Popup
        isOpen={backgroundPopupOpen}
        setIsOpen={setBackgroundPopupOpen}
        >
        {background &&
          <BackgroundCloset 
            background={background}
            setBackground={setBackground}
            setPopup={setBackgroundPopupOpen}
            purchasedBackgrounds={profileData.purchasedBackgrounds}
          />
        }
      </Popup>

      <Popup
        isOpen={framePopupOpen}
        setIsOpen={setFramePopupOpen}
        >
        {frame &&
          <FrameCloset 
            avatar={avatar}
            frame={frame}
            setFrame={setFrame}
            setPopup={setFramePopupOpen}
            purchasedFrames={profileData.purchasedFrames}
          />
        }
      </Popup>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  conainer: {

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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputs: {
    paddingHorizontal: '4%'
  },

  inputsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },

  input: {
    flex: 1
  },
  mainButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    paddingHorizontal: '4%',
    paddingBottom: 30
  }
})

export default EditProfile;

