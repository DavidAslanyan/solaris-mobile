import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { ReactNode } from 'react'
import ArrowIcon from '../icons/ArrowIcon';
import { Colors } from '@/constants/Colors';
import ThemeText from '../themes/theme-text';

type OptionTabProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode
}

const OptionTab: React.FC<OptionTabProps> = ({
  title,
  onPress,
  icon
}) => {
  const theme = useColorScheme();
  const tabColor = theme === 'dark' ? Colors.darkThirdly : Colors.white;

  return (
    <TouchableOpacity style={[styles.container, {
      backgroundColor: tabColor
    }]} onPress={onPress}>
      <View style={styles.content}>
        <View>{icon}</View>
        <ThemeText weight='medium' size='md'>{title}</ThemeText>
      </View>

      <View style={styles.arrow}><ArrowIcon width={42} height={42} /></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '3%',
    paddingLeft: '3%',
    marginHorizontal: '4%'
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    gap: 10
  },

  arrow: {
    transform: [{rotate: '270deg'}]
  }
})

export default OptionTab;

