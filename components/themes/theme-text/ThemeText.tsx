import { Text, TextStyle, useColorScheme } from 'react-native';
import React, { ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import { useAppTheme } from '@/app/contexts/ThemeContext';

interface ThemeTextProps {
  children: string | number | ReactNode;
  style?: TextStyle;
  size?: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  capitalize?: boolean;
}

const sizeMap: Record<NonNullable<ThemeTextProps['size']>, number> = {
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
};

const weightMap: Record<NonNullable<ThemeTextProps['weight']>, TextStyle['fontWeight']> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const ThemeText: React.FC<ThemeTextProps> = ({ children, style, size = 'base', weight = 'normal', capitalize = false }) => {
  const { theme } = useAppTheme();
  const textColor = theme === 'light' ? Colors.secondary : Colors.white;

  return (
    <Text
      style={[
        {
          color: textColor,
          fontSize: sizeMap[size] ?? sizeMap['base'], 
          fontWeight: weightMap[weight] ?? '400', 
          textTransform: capitalize ? "capitalize" : "none"
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
