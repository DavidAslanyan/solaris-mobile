import LottieView from 'lottie-react-native';
import lottie from './hero.json';
import { View } from "react-native";

const ErrorAnimation = ({ width = 180, height = 180 }: { width?: number, height?: number }) => {
  return (
  <View>
    <LottieView 
      source={lottie}
      autoPlay
      loop={false}
      style={{
        width: width,
        height: height
      }}
    />
  </View>
  );
};


export default ErrorAnimation;
