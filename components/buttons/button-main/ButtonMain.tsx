import { Colors } from '@/constants/Colors';
import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

type ButtonProps = {
  title: string;
  onPress?: (arg?: any) => void;
  disabled?: boolean;
};

const ButtonMain = forwardRef<typeof TouchableOpacity, ButtonProps>(({ 
  title, 
  onPress, 
  disabled = false,
  ...props 
}, ref) => {

  const handleButtonPress = () => {
    onPress && onPress()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }


  return (
    <TouchableOpacity 
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      onPress={handleButtonPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    marginHorizontal: '4%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    transitionDuration: '3'
  },
  enabled: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.secondary, 
    borderColor: Colors.secondary,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDisabled: {
    color: '#6c757d',
  },
});

export default ButtonMain;

