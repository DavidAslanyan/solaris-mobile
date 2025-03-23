
import { Colors } from '@/constants/Colors';
import { MAX_POINTS } from '@/constants/global-data';
import React from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressBarType = {
  progress?: number;
  limit?: number;
  maxWidth?: number; 
};

const ProgressBar: React.FC<ProgressBarType> = ({
  progress = 0,
  limit = MAX_POINTS,
  maxWidth = 640, 
}) => {
  const progressWidth = Math.min((progress / limit) * 100, 100);

  return (
    <View style={[styles.container, { maxWidth }]}> 
      <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20, 
    backgroundColor: Colors.thirdly, 
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    height: 20, 
    backgroundColor: Colors.primary, 
    borderRadius: 10,
    transitionDuration: '300ms',
  },
});

export default ProgressBar;
