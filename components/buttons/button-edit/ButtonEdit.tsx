import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import EditIcon from '@/components/icons/EditIcon';
import { Colors } from '@/constants/Colors';

type ButtonEditProps = {
  title: string;
  onPress: () => void;
  maxWidth?: number;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({
  title,
  onPress,
  maxWidth = 100
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, {
        maxWidth: maxWidth,
      }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <EditIcon width={24} height={24} color={Colors.white} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center'
  },
  title: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 18
  }
})

export default ButtonEdit;

