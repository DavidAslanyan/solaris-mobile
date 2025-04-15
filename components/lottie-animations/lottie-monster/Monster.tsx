import LottieView from 'lottie-react-native';
import lottieMonster from './lottie-monster.json';
import { View } from "react-native";

const Monster = ({ width = 40, height = 40 }: { width?: number, height?: number }) => {
  return (
  <View>
    <LottieView 
      source={lottieMonster}
      autoPlay
      loop={true}
      style={{
        width: width,
        height: height
      }}
    />
  </View>
  );
};


export default Monster;
