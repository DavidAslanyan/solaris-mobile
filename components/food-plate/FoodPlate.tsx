import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type FoodPlateProps = {
  step: number;
};

const foods = {
  fish: require('@/assets/images/games/food-1.png'),
  pizza: require('@/assets/images/games/food-2.png'),
  pepper: require('@/assets/images/games/food-3.png'),
  egg: require('@/assets/images/games/food-4.png'),
  cake: require('@/assets/images/games/food-5.png'),
};

const FoodPlate: React.FC<FoodPlateProps> = ({ step }) => {
  return (
    <View style={styles.plate}>
      <View style={styles.innerPlate} />

      {step >= 1 && (
        <Image source={foods.fish} style={[styles.food, styles.fish]} resizeMode="contain" />
      )}
      {step >= 2 && (
        <Image source={foods.egg} style={[styles.food, styles.egg]} resizeMode="contain" />
      )}
      {step >= 3 && (
        <Image source={foods.pizza} style={[styles.food, styles.pizza]} resizeMode="contain" />
      )}
      {step >= 4 && (
        <Image source={foods.pepper} style={[styles.food, styles.pepper]} resizeMode="contain" />
      )}
      {step >= 5 && (
        <Image source={foods.cake} style={[styles.food, styles.cake]} resizeMode="contain" />
      )}

      <Text style={styles.text}>Drop Here</Text>
    </View>
  );
};

const SIZE = 140; 

const styles = StyleSheet.create({
  plate: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#fff',
    borderRadius: SIZE / 2,
    borderWidth: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkThirdly,
    fontWeight: '500',
    fontSize: 16
  },
  innerPlate: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: (SIZE - 16) / 2,
  },
  food: {
    position: 'absolute',
  },
  fish: {
    top: 0,
    left: 0,
    width: 66,
    height: 66,
  },
  egg: {
    top: 0,
    right: 0,
    width: 80,
    height: 66,
  },
  pizza: {
    top: 44,
    right: 0,
    width: 80,
    height: 56,
  },
  pepper: {
    top: 56,
    left: 0,
    width: 76,
    height: 56,
  },
  cake: {
    bottom: 8,
    left: 56,
    width: 60,
    height: 60,
  },
});

export default FoodPlate;
