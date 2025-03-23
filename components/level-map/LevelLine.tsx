import React from 'react';
import { View, StyleSheet, ImageSourcePropType, useColorScheme } from 'react-native';
import World from './World';
import Avatar from '../avatar';
import { Colors } from '@/constants/Colors';

type LevelLineProps = {
  progress: number;
  limit: number;
  leftWorld: ImageSourcePropType;
  rightWorld: ImageSourcePropType;
  direction: 'toRight' | 'toLeft';
  index: number;
  levelsTotal: number;
  leftTitle: string;
  rightTitle: string;
};

const LevelLine: React.FC<LevelLineProps> = ({
  progress,
  limit,
  leftWorld,
  rightWorld,
  direction,
  index,
  levelsTotal,
  leftTitle,
  rightTitle,
}) => {
  const theme  = useColorScheme();
  const inactiveColor = theme === "dark" ? Colors.inacitveBackground : Colors.thirdly;

  const width = Math.min((progress / limit) * 100, 100);

  let leftActive = false;
  let rightActive = false;

  if (progress >= limit) {
    leftActive = true;
    rightActive = true;
  } else if (progress <= limit && direction === 'toRight' && progress !== 0) {
    rightActive = false;
    leftActive = true;
  } else if (progress <= limit && direction === 'toLeft' && progress !== 0) {
    rightActive = true;
    leftActive = false;
  }

  return (
    <View style={styles.container}>
      <View>
        <World passed={leftActive} image={leftWorld} direction="toRight" title={leftTitle} />

        {index % 2 === 1 && (
          <View style={[styles.verticalLineContainer, { left: 52 }]}>
            <View style={[styles.verticalLine, leftActive ? styles.activeLine : { backgroundColor: inactiveColor }]} />
          </View>
        )}
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {
          backgroundColor: inactiveColor
        }]}>
          <View
            style={[
              styles.progressIndicator,
              direction === 'toRight' ? { left: 0 } : { right: 0 },
              { width: `${width}%` },
            ]}
          />
          {progress < limit && progress !== 0 && (
            <View
              style={[
                styles.userCircleContainer,
                direction === 'toLeft' ? { right: `${width + 2}%` } : { left: `${width - 2}%` },
              ]}
            >
              <Avatar />
            </View>
          )}
        </View>
      </View>

      <View>
        <World passed={rightActive} image={rightWorld} direction="toLeft" title={rightTitle} />

        {index % 2 === 0 && index !== levelsTotal - 1 && (
          <View style={[styles.verticalLineContainer, { left: 48 }]}>
            <View style={[styles.verticalLine, rightActive ? styles.activeLine : { backgroundColor: inactiveColor }]} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  verticalLineContainer: {
    position: 'absolute',
  },
  verticalLine: {
    width: 15,
    height: 210,
    position: 'relative',
    top: 8,
  },
  activeLine: {
    backgroundColor: Colors.primary, 
  },
  inactiveLine: {
    backgroundColor: Colors.thirdly, 
  },
  progressContainer: {
    flex: 1,
    position: 'relative',
  },
  progressBar: {
    position: 'relative',
    height: 15,
  },
  progressIndicator: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    height: 15, 
  },
  userCircleContainer: {
    position: 'absolute',
    bottom: -9, 
  },
});

export default LevelLine;
