import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, ViewStyle } from 'react-native';

interface DraggableBoxProps {
  children: React.ReactNode;
  style?: ViewStyle;
  resetOnRelease?: boolean; 
}

const DraggableBox: React.FC<DraggableBoxProps> = ({
  children,
  style,
  resetOnRelease = false,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        if (resetOnRelease) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[pan.getLayout(), style]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default DraggableBox;
