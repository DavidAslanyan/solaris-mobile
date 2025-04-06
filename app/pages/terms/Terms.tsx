import { View, StyleSheet } from 'react-native'
import React, { Fragment, useMemo, useState } from 'react'
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based';
import { PROGRESS_POINTS } from '@/constants/global-data';
import ThemeText from '@/components/themes/theme-text';
import { ThemedView } from '@/components/ThemedView';
import LottieAnimation from '@/components/lottie-animations/lottie-animation';
import studyHero from '@/components/lottie-animations/study-hero.json';
import ButtonMain from '@/components/buttons/button-main';
import Stopwatch from '@/components/stopwatch/Stopwatch';
import TermSwiper from '@/components/term-swiper';
import ButtonBack from '@/components/buttons/button-back';


const Terms = () => {
  const [gameLive, setGameLive] = useState<boolean>(false);
  // const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    // if (!user) return null;
    return {
      username: `David`,
      progress: 0, 
      gamesPassed: 0,
      coins: 0,
      points: 0,
      difficultyLevel: DifficultyLevel.EASY
      // username: `${user.data.firstName} ${user.data.lastName}`,
      // progress: user.data.progress ?? 0, 
      // gamesPassed: user.data.gamesPassed,
      // coins: user.data.coins,
      // points: user.data.points,
      // difficultyLevel: user.data.difficultyLevel
    };
  }, []); //user
  
  const curProgress = userMappedData?.progress;
  const termsLevelBased = fetchTermsLevelBased(userMappedData?.difficultyLevel); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);

  if (!gameLive) {
    return (
      <ThemedView style={styles.container}>
        <ButtonBack text='Back' />
        <View style={styles.termsContainer}>
          <View>
            <ThemeText size='xl' weight='bold'>Terms you are going to learn today</ThemeText>
            <View>
              {termData.map((data, index) => (
                <Fragment key={index}>
                  <ThemeText size='md' weight='medium'>{index + 1}. {data.term}</ThemeText>
                </Fragment>
              ))}
            </View>
          </View>

          <View>
            <LottieAnimation src={studyHero}  />
          </View>
        </View>
        <ButtonMain onPress={() => setGameLive(true)} title='Study'/>
      </ThemedView>
    )
  }
  
  return (
    <ThemedView style={styles.container}>
      <ButtonBack text='Back' />
      <View style={styles.stopWatch}>
        <Stopwatch />
      </View>
      <TermSwiper data={termData} />
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  stopWatch: {
    alignSelf: 'center',
    paddingBottom: '3%'
  }
})


export default Terms;

