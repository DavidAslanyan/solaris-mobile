import Lottie from "lottie-react";
import lottie from './lottie-programmer.json';
import { View } from "react-native";

const Programmer = () => {
  return (
  <View className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </View>
  );
};


export default Programmer;
