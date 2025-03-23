import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { FRAMES } from '@/constants/shop-items';

type AvatarFrameProps = {
  type?: string;
  children: ReactNode;
}

const AvatarFrame: React.FC<AvatarFrameProps> = ({
  type = FRAMES.def,
  children
}) => {
  return (
    <View>
      { children }
    </View>
  )
}

export default AvatarFrame;
