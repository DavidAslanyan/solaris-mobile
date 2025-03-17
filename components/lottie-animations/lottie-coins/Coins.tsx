import Lottie from "lottie-react";
import lottie from './coins.json';
import { View } from "react-native";

type CoinsType = {
  width?: string;
}

const Coins: React.FC<CoinsType> = ({
  width =  "max-w-[20rem]"
}) => {
  return (
  <View className={`w-full ${width}`}>
    <Lottie animationData={lottie} loop={false} />
  </View>
  );
};


export default Coins;
