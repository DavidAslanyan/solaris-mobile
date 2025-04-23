import { View } from 'react-native'
import Loading from '@/components/lottie-animations/loading.json';
import LottieAnimation from '../lottie-animations/lottie-animation';

const Loader = () => {
  return (
    <View style={{
      alignSelf: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <LottieAnimation width={120} height={100} src={Loading}/>
    </View>
  )
}

export default Loader;
