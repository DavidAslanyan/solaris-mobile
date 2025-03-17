import Lottie from "lottie-react";
import lottieMonster from './lottie-monster.json';
import { View } from "react-native";

const Monster = () => {
  return (
  <View className="w-full max-w-[20rem]">
    <Lottie animationData={lottieMonster} />
  </View>
  );
};


export default Monster;
