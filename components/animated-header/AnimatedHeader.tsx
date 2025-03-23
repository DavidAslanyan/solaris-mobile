import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native'
import React, { ReactNode } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import ThemeText from '../themes/theme-text';
import SettingsIcon from '../icons/profile-icons/SettingsIcon';
import { Colors } from '@/constants/Colors';
import SearchIcon from '../icons/navbar-icons/SearchIcon';
import CloseIcon from '../icons/CloseIcon';
import Logo from '../logo';
import Avatar from '../avatar';

type AnimatedHeaderProps = {
  inputText: string,
  setInputText: (arg: string) => void;
  handleTextChange: any,
  handleSearchSubmit: any,
  children: ReactNode
}

const { width: screenWidth } = Dimensions.get('window');
const contentTopHeight =  screenWidth < 380 ? '23%' : '22%'; 

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  inputText,
  setInputText,
  handleTextChange,
  handleSearchSubmit,
  children
}) => {
  const translateY = useSharedValue(0);
  const inputWidth = useSharedValue(screenWidth * 0.9);
  const contentTranslateY = useSharedValue(0);
  const contentTopHeight = -40; 
  const contentHeight =  screenWidth < 380 ? 10 : 6; 

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (event.contentOffset.y > 0) {
        translateY.value = withTiming(-40, { duration: 300, easing: Easing.out(Easing.quad) });
        inputWidth.value = withTiming(screenWidth * 0.70, { duration: 300, easing: Easing.out(Easing.quad) });
        contentTranslateY.value = withTiming(contentHeight, { duration: 300, easing: Easing.out(Easing.quad) });
      } else {
        translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) });
        inputWidth.value = withTiming(screenWidth * 0.9, { duration: 300, easing: Easing.out(Easing.quad) });
        contentTranslateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) });
      }
    },
  });

  const inputContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      width: inputWidth.value,
    };
  });

  const contentContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: contentTranslateY.value }],
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, contentTopHeight],
      [1, 0]
    );
    return {
      opacity
    }
  })

  return (
    <View>
     <View style={styles.header}>
        <Animated.View style={[styles.content, contentContainerStyle]}>
          <Animated.View style={[styles.logoWrapper, titleStyle]}>
            <Logo />
          </Animated.View>
          <View style={styles.tabs}>
            <Avatar />
            <TouchableOpacity style={styles.settingsTab}>
              <SettingsIcon color={Colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.inputContainer, inputContainerStyle]}>
        <View style={styles.searchContainer}>
          <View>
            <View style={styles.searchContent}>
              <TouchableOpacity style={styles.searchWrapper}>
                <SearchIcon width={22} height={22} />
              </TouchableOpacity>
              <TextInput
                onSubmitEditing={handleSearchSubmit}
                style={styles.inputText}
                value={inputText}
                onChangeText={handleTextChange}
                placeholder="Search terms"
              >
              </TextInput>
            </View>
            <View style={styles.inputRightContent}>
              {inputText && (
                <TouchableOpacity onPress={() => setInputText('')}>
                  <CloseIcon />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        onScroll={scrollHandler} 
        scrollEventThrottle={16} 
        contentContainerStyle={styles.scrollContent}
        >
        { children }
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '16.8%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    width: '100%',
    paddingTop: '8%',
    paddingBottom: 10,
    paddingHorizontal: '4.6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'absolute',
    top: '13%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  input: {
    width: '100%',
    marginTop: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    left: "5%",
    zIndex: 15,
    backgroundColor: Colors.white,
    borderRadius: 25
  },
  searchContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: '4%',
  },
  searchWrapper: {
    paddingLeft: '3%',
  },
  inputText: {
    paddingLeft: 12,
    width: '60%',
    backgroundColor: Colors.white
  },
  inputRightContent: {
    gap: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '3%',
    top: '15%'
  },
  scrollContent: {
    paddingTop: contentTopHeight,
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  settingsTab: {
    paddingRight: '3%'
  }
})

export default AnimatedHeader;
