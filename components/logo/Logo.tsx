import { View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View>
      <Image 
        style={{
          width: 60,
          height: 30
        }}
        source={require('@/assets/images/logo.png')} 
        />
    </View>
  )
}

export default Logo;

