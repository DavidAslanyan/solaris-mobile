import LottieView from 'lottie-react-native';
import { View } from "react-native";

type LottieAnimationProps = {
  src: any;
  width?: number;
  height?: number;
  loop?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  width = 200, 
  height = 180,
  loop = true,
  src 
}) => {
  return (
  <View>
    <LottieView 
      source={src}
      autoPlay
      loop={loop}
      style={{
        width: width,
        height: height
      }}
    />
  </View>
  );
};


export default LottieAnimation;
