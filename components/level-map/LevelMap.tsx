import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LevelLine from './LevelLine';

type LevelMapProps = {
  progress: number;
};

export const LEVELS = [
  {
    point: 100,
    leftWorld: require('@/assets/images/levels/level-1.png'),
    rightWorld: require('@/assets/images/levels/level-2.png'),
    leftTitle: 'Highrock',
    rightTitle: 'Riverside',
  },
  {
    point: 100,
    leftWorld: require('@/assets/images/levels/level-3.png'),
    rightWorld: require('@/assets/images/levels/level-4.png'),
    leftTitle: 'Everpond',
    rightTitle: 'Stonebrook',
  },
  {
    point: 200,
    leftWorld: require('@/assets/images/levels/level-5.png'),
    rightWorld: require('@/assets/images/levels/level-6.png'),
    leftTitle: 'Frostmere',
    rightTitle: 'Snowhaven',
  },
  {
    point: 200,
    leftWorld: require('@/assets/images/levels/level-10.png'),
    rightWorld: require('@/assets/images/levels/level-8.png'),
    leftTitle: 'Autumande',
    rightTitle: 'Celestia',
  },
  {
    point: 300,
    leftWorld: require('@/assets/images/levels/level-9.png'),
    rightWorld: require('@/assets/images/levels/level-7.png'),
    leftTitle: 'Sandrift',
    rightTitle: 'Maplevale',
  },
  {
    point: 300,
    leftWorld: require('@/assets/images/levels/level-13.png'),
    rightWorld: require('@/assets/images/levels/level-12.png'),
    leftTitle: 'Stormcliff',
    rightTitle: 'Duskwater',
  },
  {
    point: 300,
    leftWorld: require('@/assets/images/levels/level-14.png'),
    rightWorld: require('@/assets/images/levels/level-11.png'),
    leftTitle: 'Glaciera',
    rightTitle: 'Blazewood',
  },
];

const LevelMap: React.FC<LevelMapProps> = ({ progress }) => {
  const cumulativeThresholds = LEVELS.map(((sum) => (level) => (sum += level.point))(0));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.levelsWrapper}>
        {LEVELS.map((level, index) => {
          const prevThreshold = index === 0 ? 0 : cumulativeThresholds[index - 1];
          const currentThreshold = cumulativeThresholds[index];

          let barProgress = 0;
          if (progress >= currentThreshold) {
            barProgress = level.point;
          } else if (progress > prevThreshold) {
            barProgress = progress - prevThreshold;
          }

          return (
            <LevelLine
              key={index}
              progress={barProgress}
              limit={level.point}
              leftWorld={level.leftWorld}
              rightWorld={level.rightWorld}
              direction={index % 2 === 0 ? 'toRight' : 'toLeft'}
              index={index}
              levelsTotal={LEVELS.length}
              leftTitle={level.leftTitle}
              rightTitle={level.rightTitle}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 40, 
  },
  levelsWrapper: {
    flexDirection: 'column',
    gap: 86, 
  },
});

export default LevelMap;
