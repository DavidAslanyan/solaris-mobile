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


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  setIsRunning: (arg: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, isRunning, setIsRunning }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(1); // from 1 to 0
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
      progress.value = 1; // Reset progress if timer is not running
    }
  }, [isRunning]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={styles.container}>
      <Svg width={150} height={150} viewBox="0 0 120 120">
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke={Colors.secondary}
          strokeWidth="6"
          fill="transparent"
          opacity={0.2}
        />
        <AnimatedCircle
          cx="60"
          cy="60"
          r={radius}
          stroke={Colors.secondary}
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
            color: Colors.secondary,
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
