import { useAppTheme } from "@/app/contexts/ThemeContext";
import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  setIsRunning: (arg: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, isRunning, setIsRunning }) => {
  const { theme } = useAppTheme();
  const color = theme === 'dark' ? Colors.white : Colors.secondary;

  const [time, setTime] = useState<number>(seconds);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time]);

  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / seconds) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={120} height={120}>
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.2}
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <SvgText
          x="56"
          y="60"
          textAnchor="middle"
          dy=".3em"
          fill={color}
          fontSize="20"
        >
          {time}s
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Timer;
