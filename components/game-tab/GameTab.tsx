import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import ButtonMainSmall from '../buttons/button-main-small';
import { useAppTheme } from '@/app/contexts/ThemeContext';

type GameTabProps = {
  id: number;
  title: string;
  url: string;
  gif: string;
  image: ImageSourcePropType;
  completed: boolean;
  pressed: boolean;
  setPressed: (arg: number) => void;
};

const GameTab: React.FC<GameTabProps> = ({
  id,
  title,
  url,
  gif,
  image,
  completed,
  pressed,
  setPressed
}) => {
  const { theme } = useAppTheme();
  const titleTranslate = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pressed) {
      Animated.parallel([
        Animated.timing(titleTranslate, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(titleTranslate, {
          toValue: 80,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pressed]);

  return (
    <TouchableOpacity onPress={() => setPressed(id)} style={[styles.box, {
      borderColor: theme === 'dark' ? Colors.lowOpacityWhite : Colors.thirdly,
    }]}>
      {completed && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>COMPLETED</Text>
        </View>
      )}
      <Image style={styles.image} source={image} />
      <View style={styles.content}>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX: titleTranslate }] }
          ]}
        >
          {title}
        </Animated.Text>
        <Animated.View style={{ opacity: buttonOpacity }}>
          <ButtonMainSmall title='Play' />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: 200,
    borderWidth: 2,
    borderRadius: 8,
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 190,
    alignSelf: 'center',
    overflow: 'hidden',
    resizeMode: 'cover',
    borderRadius: 8
  },
  content: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: Colors.secondary,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  title: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'left',
    flex: 1,
  },
  completedContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.primary,
    width: '100%',
    zIndex: 20,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  completedTitle: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default GameTab;
