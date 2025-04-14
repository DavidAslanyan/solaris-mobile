import { useAppTheme } from '@/app/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export enum QuizButtonForm {
  SUCCESS = 'success',
  ERROR = 'error',
  DEF = 'def',
}

type ButtonProps = {
  title: string;
  onPress: () => void;
  form: QuizButtonForm;
};

const ButtonQuizStep: React.FC<ButtonProps> = ({ title, onPress, form }) => {
  const { theme } = useAppTheme();
  const getButtonStyle = () => {
    switch (form) {
      case QuizButtonForm.SUCCESS:
        return styles.success;
      case QuizButtonForm.ERROR:
        return styles.error;
      case QuizButtonForm.DEF:
      default:
        return theme === 'dark' ? styles.darkDefault : styles.default
    }
  };

  return (
    <TouchableOpacity style={[styles.button, getButtonStyle()]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    backgroundColor: Colors.primary, 
  },
  error: {
    backgroundColor: Colors.red,
  },
  default: {
    backgroundColor: Colors.secondary, 
  },
  darkDefault: {
    backgroundColor: Colors.darkerBackgorund,
    borderWidth: 1,
    borderColor: Colors.thirdly 
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ButtonQuizStep;
