import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

const ButtonMain = forwardRef<typeof TouchableOpacity, ButtonProps>(({ 
  title, 
  onPress, 
  disabled = false,
  ...props 
}, ref) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      onPress={onPress}
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
  },
  enabled: {
    backgroundColor: '#007bff', // Primary color
    borderColor: '#007bff',
  },
  disabled: {
    backgroundColor: '#d3d3d3', // Disabled background color
    borderColor: '#a9a9a9',
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

