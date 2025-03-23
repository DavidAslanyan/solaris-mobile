import { View, StyleSheet } from 'react-native'
import React from 'react'
import TriangleIcon from '@/components/icons/TriangleIcon'
import { Colors } from '@/constants/Colors'

const TabStudy = () => {
  return (
    <View style={styles.container}>
      <TriangleIcon color={Colors.white} width={30} height={30} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 120,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '45deg'}]
  },


  title: {
    fontWeight: "700",
    color: Colors.white
  }
})

export default TabStudy