import { Colors } from '@/constants/Colors';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import ThemeText from '../themes/theme-text';

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const theme = useColorScheme();
  const lineColor = theme === 'light' ? Colors.thirdly : Colors.white;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, {
      borderBottomColor: lineColor
    }]}>
      <ThemeText weight='bold' size='md'>{formatTime(time)}</ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '1%'
  },
});

export default Stopwatch;
