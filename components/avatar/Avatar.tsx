import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { selectFrameColor } from '@/utilities/functions/select-frame-color'

const Avatar = () => {
  const data = {
    avatarUrl: require("@/assets/images/user-avatars/male-1.png"),
    frame: "def"
  }

  return (
    <View style={[styles.frame, { borderColor: selectFrameColor(data.frame) } ]}>
      <Image style={styles.avatar} source={data.avatarUrl} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 2,
    borderRadius: 120
  },

  avatar: {
    width: 30,
    height: 30
  }
})

export default Avatar;

