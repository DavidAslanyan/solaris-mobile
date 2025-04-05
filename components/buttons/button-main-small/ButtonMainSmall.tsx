import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';


type ButtonMainSmallProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonMainSmall: React.FC<ButtonMainSmallProps> = ({
  title,
  onPress,
  disabled
}) => {

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
        backgroundColor: disabled ? Colors.thirdly : Colors.primary,
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
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
})

export default ButtonMainSmall;

