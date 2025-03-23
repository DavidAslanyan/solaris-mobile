import { Colors } from '@/constants/Colors';
import React, { ReactNode } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

type DashboardContainerProps = {
  children: ReactNode;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? Colors.lowOpacityWhite : Colors.thirdly
  
  return (
  <View 
    style={[styles.container, {
      borderColor: color
    }]}
    >{children}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default DashboardContainer;
