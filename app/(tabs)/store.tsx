import { View, StyleSheet, TouchableOpacity, Animated, Image, ImageSourcePropType, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import ThemeText from '@/components/themes/theme-text'
import ShopIcon from '@/components/icons/navbar-icons/ShopIcon'
import { ThemedView } from '@/components/ThemedView'
import CoinIcon from '@/components/icons/CoinIcon'
import { Colors } from '@/constants/Colors'
import { BACKGROUNDS, FRAMES } from '@/constants/shop-items'
import { filterAvatars } from '@/utilities/functions/filter-avatars'

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

const NAVBAR_ITEMS = ["Avatars", "Frames", "Backgrounds"];

const Store = () => {
  const [activeNav, setActiveNav] = useState<string>(NAVBAR_ITEMS[0]);
  
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

  const avatarImages = filterAvatars(profileData.purchasedAvatars);
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <ThemeText size='xl' weight='bold'>Store</ThemeText>
          <ShopIcon />
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

          {activeNav === NAVBAR_ITEMS[0] &&
            <AvatarsSection avatars={avatarImages} />
          }

          {/* {activeNav === NAVBAR_ITEMS[1] &&
            <AvatarsSection />
          }

          {activeNav === NAVBAR_ITEMS[2] &&
          } */}
        </View>
      </View>
    </ThemedView>

  )
}

const AvatarsSection = ({ avatars }: { avatars: ImageSourcePropType[] }) => {
  return (
    <View>
      <ScrollView>
        {avatars.map((avatar, index) => (
          <View key={index}>
            <Image source={avatar} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: '4%'
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
})

export default Store;