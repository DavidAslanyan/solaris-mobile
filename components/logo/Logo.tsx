import { View, Image } from 'react-native'


type LogoProps = {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  width = 60,
  height = 30
}) => {
  return (
    <View>
      <Image 
        style={{
          width: width,
          height: height
        }}
        source={require('@/assets/images/logo.png')} 
        />
    </View>
  )
}

export default Logo;

