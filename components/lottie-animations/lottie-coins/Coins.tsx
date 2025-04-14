import LottieView from 'lottie-react-native';
import lottie from './coins.json';
import { View } from "react-native";


const Coins = ({ width = 40, height = 40 }: { width?: number, height?: number }) => {
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


export default Coins;
