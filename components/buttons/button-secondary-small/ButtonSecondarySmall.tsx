import { Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

type ButtonSecondarySmallProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonSecondarySmall: React.FC<ButtonSecondarySmallProps> = ({
  title,
  onPress,
  disabled
}) => {
  const theme = useColorScheme();
  const activeColor = theme === 'light' ? Colors.secondary : Colors.darkThirdly;
  const inactiveColor = theme === 'light' ? Colors.thirdly : Colors.darkSecondary;

  const handleButtonPress = () => {
    onPress && onPress()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
   <TouchableOpacity
    onPress={handleButtonPress}
    disabled={disabled}
    style={[
      styles.button,
      {
        backgroundColor: disabled ? inactiveColor : activeColor,
      }
    ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
})

export default ButtonSecondarySmall;

