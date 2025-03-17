import Lottie from "lottie-react";
import lottie from './hero.json';
import { View } from "react-native";

const CheckedAnimation = ({ width = "max-w-[28rem]" }: { width?: string }) => {
  return (
  <View className={`w-full ${width}`}>
    <Lottie animationData={lottie} loop={false}  />
  </View>
  );
};


export default CheckedAnimation;
