import { View, StyleSheet, TouchableOpacity, Animated, Image, ImageSourcePropType, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ThemeText from '@/components/themes/theme-text'
import ShopIcon from '@/components/icons/navbar-icons/ShopIcon'
import { ThemedView } from '@/components/ThemedView'
import CoinIcon from '@/components/icons/CoinIcon'
import { Colors } from '@/constants/Colors'
import { BACKGROUNDS, FRAMES } from '@/constants/shop-items'
import { filterAvatar } from '@/utilities/functions/filter-avatars'
import { AVATARS_STORE, AvatarStoreType, BACKGROUNDS_STORE, FRAMES_STORE, FrameStoreItemType, FrameStoreType, StoreItemType } from '../data/store.config'
import SuccessIcon from '@/components/icons/SuccessIcon'
import Popup from '@/components/popup'
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small'
import ButtonMainSmall from '@/components/buttons/button-main-small'
import { selectFrameColor } from '@/utilities/functions/select-frame-color'
import { StoreItemEnum } from '@/utilities/enums/store-item.enum'
import { filterBackground } from '@/utilities/functions/filter-backgrounds'
import { useAppTheme } from '../contexts/ThemeContext'

const profileData = {
  id: "6cadc416-677a-4aaf-8a69-fdbf53b8d761",
  avatarURL: "/user-avatars/male-1.png",
  frame: "def",
  purchasedAvatars: [
     "/user-avatars/male-1.png",
     "/user-avatars/female-1.png",
    //  "/user-avatars/male-2.png",
    //  "/user-avatars/female-2.png",
    //  "/user-avatars/male-3.png",  
    //  "/user-avatars/female-3.png",
    //  "/user-avatars/limited-1.png",
    //  "/user-avatars/limited-2.png",
    //  "/user-avatars/limited-3.png",
    //  "/user-avatars/limited-4.png",
    //  "/user-avatars/limited-5.png",
    //  "/user-avatars/limited-6.png",
  ],
  purchasedBackgrounds: [
    BACKGROUNDS.def,
    BACKGROUNDS.cover1,
    // BACKGROUNDS.cover2,
    // BACKGROUNDS.cover3,
    // BACKGROUNDS.cover4,
    // BACKGROUNDS.cover5,
    // BACKGROUNDS.cover6,
    // BACKGROUNDS.cover7,
    // BACKGROUNDS.cover8,
    // BACKGROUNDS.cover9,
  ],
  purchasedFrames: [
    FRAMES.def, 
    FRAMES.black, 
    FRAMES.red, FRAMES.blue, FRAMES.lightBlue, FRAMES.orange, FRAMES.purple,
    FRAMES.yellow, FRAMES.pink, FRAMES.teal, FRAMES.lime, FRAMES.indigo, FRAMES.rose,
    FRAMES.amber, FRAMES.cyan, FRAMES.emerald, FRAMES.violet
  ],
  coins: 275,
  backgroundUrl: BACKGROUNDS.cover2,
  rang: "Student",
  rangURL: "/rangs/rang-1.png",
  firstName: "David",
  lastName: "Aslanyan",
  email: "david@gmail.com",
  progress: 150,
};

const NAVBAR_ITEMS = ["Avatars", "Frames", "Backgrounds"];

const Store = () => {
  const ownedAvatars = profileData?.purchasedAvatars ?? [];
  const ownedFrames = profileData?.purchasedFrames ?? [];
  const ownedBackgrounds= profileData?.purchasedBackgrounds ?? [];
  const coins = profileData?.coins ?? 0;

  const { theme } = useAppTheme();

  const [activeNav, setActiveNav] = useState<string>(NAVBAR_ITEMS[0]);
  const [selectedItem, setSelectedItem] = useState<StoreItemType | null>(null);
  
  const underlineAnimation = useRef(new Animated.Value(24)).current;
  const selectNavbarItem = (title: string, index: number) => {
    setActiveNav(title);
    const val = index === 2 ? 119 : 105; 
    const toValue = 24 + index * val
    Animated.spring(underlineAnimation, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const avatarStore = AVATARS_STORE.map((avatar) => (
    {
      ...avatar,
      formattedUrl: filterAvatar(avatar.url) as ImageSourcePropType
    }
  ));
  const backgroundsStore = BACKGROUNDS_STORE.map((background) => (
    {
      ...background,
      formattedUrl: filterBackground(background.url) as ImageSourcePropType
    }
  ));

  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <ThemeText size='xl' weight='bold'>Store</ThemeText>
          <ShopIcon color={theme === 'dark' ? Colors.white : Colors.secondary} />
        </View>

        <View style={styles.balance}>
          <ThemeText size='lg' weight='semibold'>Current Balace: </ThemeText>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <CoinIcon />
            <ThemeText  size='lg' weight='semibold'>{profileData.coins}</ThemeText>
          </View>
        </View>

        <View>
          <View style={styles.contentNavbar}>
            {NAVBAR_ITEMS.map((item, index) => (
              <TouchableOpacity onPress={() => selectNavbarItem(item, index)} key={index}>
                <ThemeText size='md' weight='bold' style={activeNav === item ? styles.navbarTitleActive : styles.navbarTitle}>{item}</ThemeText>
              </TouchableOpacity>
            ))}
          </View>

          <Animated.View
            style={{
              position: 'relative',
              top:'5%',
              left: underlineAnimation,
              width: "18%",
              height: 6,
              backgroundColor: Colors.primary,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
          />

          <View style={styles.line}/>
        </View>

        <View style={styles.store}>
          {activeNav === NAVBAR_ITEMS[0] &&
            <AvatarsSection owned={ownedAvatars} set={setSelectedItem} data={avatarStore} />
          }

          {activeNav === NAVBAR_ITEMS[1] &&
            <FramesSection owned={ownedFrames} set={setSelectedItem} data={FRAMES_STORE} />
          }

          {activeNav === NAVBAR_ITEMS[2] &&
            <BackgroundsSection owned={ownedBackgrounds} set={setSelectedItem} data={backgroundsStore} />
          }
        </View>

        <Popup
          isOpen={selectedItem !== null}
          setIsOpen={(setSelectedItem)}
          >
          <View>
            {selectedItem &&
            (ownedAvatars.includes(selectedItem?.url) 
             || ownedFrames.includes(selectedItem?.url) 
             || ownedBackgrounds.includes(selectedItem?.url)) 
             ?
             <View style={styles.popupContent}>
              <ThemeText size='md' weight='medium'>You already own this item</ThemeText>
              {selectedItem.type === StoreItemEnum.AVATAR
              || selectedItem.type === StoreItemEnum.BACKGROUND
              ?
              <Image 
                style={selectedItem.type === StoreItemEnum.AVATAR ? styles.avatarImage : styles.backgroundImageLarge} 
                source={selectedItem.formattedUrl} 
              />
              :
              <View style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                borderWidth: 7,
                borderColor: selectFrameColor(selectedItem.url),
                backgroundColor: theme === 'dark' ? Colors.darkerBackgorund : Colors.backPrimary,
              }} />
              }
              
              <View  style={styles.avatarContent}>
                <SuccessIcon />
                <ThemeText weight='medium'>Owned</ThemeText>
              </View>
              <ButtonSecondarySmall title='Back' onPress={() => setSelectedItem(null)} />
             </View>
             : 
             <>
             {selectedItem &&
              <View style={styles.popupContent}>
                <ThemeText size='md' weight='medium'>Would you like to buy this item ?</ThemeText>
                {selectedItem.type === StoreItemEnum.AVATAR
                || selectedItem.type === StoreItemEnum.BACKGROUND
                ?
                  <Image 
                    style={selectedItem.type === StoreItemEnum.AVATAR ? styles.avatarImage : styles.backgroundImageLarge} 
                    source={selectedItem.formattedUrl} 
                  />
                :
                  <View style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    borderWidth: 7,
                    borderColor: selectFrameColor(selectedItem.url),
                    backgroundColor: theme === 'dark' ? Colors.darkerBackgorund : Colors.backPrimary,
                  }} />
                }
                <View  style={styles.avatarContent}>
                  <CoinIcon />
                  <ThemeText weight='medium'>{selectedItem.price}</ThemeText>
                </View>
                <View style={styles.buttonsContainer}>
                  <ButtonSecondarySmall title='Back' onPress={() => setSelectedItem(null)} />
                  <ButtonMainSmall title='Buy Item' disabled={coins < selectedItem.price} />
                </View>
             </View>
             }
             </>
            }
          </View>
        </Popup>
          
      </View>
    </ThemedView>

  )
}

const AvatarsSection = ({ owned, set, data }: { owned: string[], set: (arg: StoreItemType) => void, data: AvatarStoreType[] }) => {
  return (
    <View style={styles.avatarContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarList}>
          {data.map((item, index) => (
            <TouchableOpacity onPress={() => set(item)} key={index}>
              <View style={styles.avatarItem}>
                <Image style={styles.avatarImage} source={item.formattedUrl} />
                <ThemeText size='md' weight='semibold'>{item.title}</ThemeText>
                {owned.includes(item.url)
                ? 
                <View style={styles.avatarContent}>
                  <SuccessIcon />
                  <ThemeText weight='medium'>Owned</ThemeText>
                </View>
                : 
                <View style={styles.avatarContent}>
                  <CoinIcon />
                  <ThemeText weight='semibold'>{item.price}</ThemeText>
                </View>
                }
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const FramesSection = ({ owned, set, data }: { owned: string[], set: (arg: FrameStoreItemType) => void, data: FrameStoreType[] }) => {
  return (
    <View style={styles.avatarContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarList}>
          {data.map((item, index) => (
            <TouchableOpacity onPress={() => set(item)} key={index}>
              <View style={styles.avatarItem}>
                <View style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  borderWidth: 7,
                  borderColor: selectFrameColor(item.url)
                }} />
                <ThemeText size='md' weight='semibold'>{item.title}</ThemeText>
                {owned.includes(item.url)
                ? 
                <View style={styles.avatarContent}>
                  <SuccessIcon />
                  <ThemeText weight='medium'>Owned</ThemeText>
                </View>
                : 
                <View style={styles.avatarContent}>
                  <CoinIcon />
                  <ThemeText weight='semibold'>{item.price}</ThemeText>
                </View>
                }
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const BackgroundsSection = ({ owned, set, data }: { owned: string[], set: (arg: StoreItemType) => void, data: AvatarStoreType[] }) => {
  return (
    <View style={styles.avatarContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarList}>
          {data.map((item, index) => (
            <TouchableOpacity onPress={() => set(item)} key={index}>
              <View style={styles.avatarItem}>
                <Image style={styles.backgroundImage} source={item.formattedUrl} />
                <ThemeText size='md' weight='semibold'>{item.title}</ThemeText>
                {owned.includes(item.url)
                ? 
                <View style={styles.avatarContent}>
                  <SuccessIcon />
                  <ThemeText weight='medium'>Owned</ThemeText>
                </View>
                : 
                <View style={styles.avatarContent}>
                  <CoinIcon />
                  <ThemeText weight='semibold'>{item.price}</ThemeText>
                </View>
                }
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: '4%',
    paddingBottom: '8%'
  },
  title: {
    paddingTop: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  balance: {
    paddingTop: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5
  },
  contentNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    paddingTop:"10%"
  },

  navbarTitle: {
    fontWeight: "500"
  },

  navbarTitleActive: {
    fontWeight: "500"
  },

  line: {
    width: "100%",
    position: 'relative',
    top: "5%",
    height: 2,
    backgroundColor: Colors.thirdly
  },
  store: {
    paddingTop: 20,
  },

  avatarContainer: {
    paddingBottom: 400,
  },

  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  avatarItem: {
    alignItems: 'center',
    gap: 5
  },
  avatarImage: {
    width: 120,
    height: 120
  },
  backgroundImage: {
    width: 140,
    height: 80,
    borderRadius: 6
  },

  backgroundImageLarge: {
    width: 200,
    height: 100,
    borderRadius: 6,
  },

  avatarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

  popupContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: '4%'
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  }
})

export default Store;