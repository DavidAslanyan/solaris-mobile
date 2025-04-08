import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Switch } from 'react-native'
import React, { ReactNode } from 'react'
import ArrowIcon from '../icons/ArrowIcon';
import { Colors } from '@/constants/Colors';
import ThemeText from '../themes/theme-text';
import { useAppTheme } from '@/app/contexts/ThemeContext';

type OptionTabProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  isSwitch?: boolean;
  switchVal?: boolean;
  onSwitchChange?: (val: boolean) => void;
}

const OptionTab: React.FC<OptionTabProps> = ({
  title,
  onPress,
  icon,
  isSwitch,
  switchVal,
  onSwitchChange
}) => {
  const { theme } = useAppTheme();
  const tabColor = theme === 'dark' ? Colors.darkThirdly : Colors.white;

  return (
    <TouchableOpacity style={[styles.container, {
      backgroundColor: tabColor
    }]} 
    onPress={onPress}
    disabled={isSwitch}
    >
      <View style={styles.content}>
        <View>{icon}</View>
        <ThemeText weight='medium' size='md'>{title}</ThemeText>
      </View>

      {isSwitch && onSwitchChange
      ?
      <View>
        <Switch 
          trackColor={{ false: "#767577", true: Colors.primary }}
          value={switchVal} 
          onValueChange={onSwitchChange}  
          style={styles.switchContainer}
        />
      </View>
      :
      <View style={styles.arrow}><ArrowIcon width={42} height={42} /></View>
      }
      
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
  },

  switchContainer: {
    marginRight: '4%',
  }
})

export default OptionTab;

