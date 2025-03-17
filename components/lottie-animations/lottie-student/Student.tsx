import Lottie from "lottie-react";
import lottie from './lottie-student.json';
import { View } from "react-native";


const Student = () => {
  return (
  <View className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </View>
  );
};


export default Student;
