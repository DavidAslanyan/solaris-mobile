import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TriangleIcon from '@/components/icons/TriangleIcon'
import { Colors } from '@/constants/Colors'

const TabStudy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.triangle}>
        <TriangleIcon width={80} height={80} color={Colors.primary} />
      </View>
      <Text style={styles.title}>Study</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  triangle: {
    transform: [{ rotate: "45deg" }],
  },

  title: {
    position: 'absolute',
    left: 14,
    width: 50,
    top: 35,
    fontWeight: "700",
    color: Colors.white
  }
})

export default TabStudy