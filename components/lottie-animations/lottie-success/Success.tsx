import LottieView from 'lottie-react-native';
import lottie from './success.json';
import { View } from "react-native";


const SuccessAnimation = ({ width = 200, height = 200 }: { width?: number, height?: number }) => {
  return (
  <View className="w-full max-w-[20rem]">
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


export default SuccessAnimation;
