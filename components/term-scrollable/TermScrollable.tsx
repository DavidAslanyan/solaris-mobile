import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

type TermScrollableProps = {
  height?: number; 
  children: ReactNode;
};

const TermScrollable: React.FC<TermScrollableProps> = ({
  height = Dimensions.get('window').height * 0.8, 
  children,
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={[styles.scrollContainer, { height }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <LinearGradient
        colors={['transparent', '#F0F0F0']}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    maxWidth: 960,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingTop: 32,
    paddingRight: 48, 
  },
  contentContainer: {
    paddingBottom: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 96,
    width: '100%',
  },
});

export default TermScrollable;
