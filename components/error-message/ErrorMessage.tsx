import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <Text style={styles.errorMessage}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    paddingHorizontal: "4%",
    color: Colors.red,
    fontWeight: "500"
  },
})

export default ErrorMessage;

