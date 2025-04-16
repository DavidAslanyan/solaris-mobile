import LottieView from 'lottie-react-native';
import lottie from './lottie-programmer.json';
import { View } from "react-native";

const Programmer = ({ width = 200, height = 200 }: { width?: number, height?: number }) => {
  return (
    <View>
    <LottieView 
      source={lottie}
      autoPlay
      loop
      style={{
        width: width,
        height: height
      }}
    />
  </View>
  );
};


export default Programmer;
