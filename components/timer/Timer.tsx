import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useDerivedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useAppTheme } from '@/app/contexts/ThemeContext';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  setIsRunning: (arg: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, isRunning, setIsRunning }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(1); 
  const animatedSeconds = useDerivedValue(() => Math.ceil(progress.value * seconds));

  useEffect(() => {
    if (isRunning) {
      progress.value = withTiming(
        0,
        { duration: seconds * 1000 },
        (finished) => {
          if (finished) runOnJS(setIsRunning)(false);
        }
      );
    } else {
      progress.value = 1; 
    }
  }, [isRunning]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const { theme } = useAppTheme();
  const color = theme === 'dark' ? Colors.white : Colors.secondary;

  return (
    <View style={styles.container}>
      <Svg width={150} height={150} viewBox="0 0 120 120">
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          opacity={0.2}
        />
        <AnimatedCircle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <Animated.Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: 65,
            fontSize: 20,
            color: color,
          }}
        >
          {animatedSeconds.value}s
        </Animated.Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Timer;
