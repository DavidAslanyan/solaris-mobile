import { 
  View, 
  ViewStyle, 
  useColorScheme, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';

interface ThemeViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const ThemeView: React.FC<ThemeViewProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? Colors.lightBackground : Colors.darkBackground;

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView 
          scrollEnabled={isKeyboardOpen}
          contentContainerStyle={[
            styles.container, 
            { backgroundColor: themeBackground }, 
            style
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1 
  }
});

export default ThemeView;
