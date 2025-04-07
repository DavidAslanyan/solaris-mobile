import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'

type BackgroundContainerProps = {
  imageUrl: ImageSourcePropType;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ imageUrl }) => {
  return (
    <View style={styles.conainer}>
      <Image style={styles.image} source={imageUrl} />
    </View>
  )
}

const styles = StyleSheet.create({
  conainer: {

  },
  image: {
    width: '100%',
    height: 250
  }
})

export default BackgroundContainer;
