import Lottie from "lottie-react";
import lottie from './success.json';
import { View } from "react-native";


const SuccessAnimation = () => {
  return (
  <View className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} loop={false} />
  </View>
  );
};


export default SuccessAnimation;
