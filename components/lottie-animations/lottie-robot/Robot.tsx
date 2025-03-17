import Lottie from "lottie-react";
import lottie from './lottie-robot.json';
import { View } from "react-native";


const Robot = () => {
  return (
  <View className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </View>
  );
};


export default Robot;
