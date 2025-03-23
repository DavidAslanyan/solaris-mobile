import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, useColorScheme } from 'react-native';

type WorldTypeProps = {
  passed: boolean;
  image: ImageSourcePropType;
  direction: 'toRight' | 'toLeft';
  title: string;
};

const World: React.FC<WorldTypeProps> = ({ passed, image, direction, title }) => {
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? Colors.inacitveBackground : Colors.backPrimary },
        { borderColor: passed ? Colors.primary : theme === "dark" ? Colors.secondary : Colors.thirdly }, 
        direction === 'toRight' ? { left: 4 } : { right: 4 },
      ]}
    >
      {/* {passed && (
        <Text style={styles.completedLabel}>COMPLETED</Text>
      )} */}
      <Image
        source={image}
        style={[styles.image, !passed && { opacity: 0.4 }]}
        resizeMode="contain"
      />
      <Text style={[styles.title, !passed && { backgroundColor: theme === "dark" ? Colors.inacitveBackground : Colors.thirdly }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 20,
    width: 116, 
    height: 112, 
    backgroundColor: Colors.backPrimary, 
    borderWidth: 4,
    borderRadius: 9999, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedLabel: {
    position: 'absolute',
    top: 5,
    left: 8,
    zIndex: 10,
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    position: 'absolute',
    bottom: -22,
    left: 10,
    backgroundColor: Colors.secondary, 
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default World;
