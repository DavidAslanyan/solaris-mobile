import { View, StyleSheet } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based';
import { MINIMUM_GAMES_PASSED, PROGRESS_POINTS } from '@/constants/global-data';
import ThemeText from '@/components/themes/theme-text';
import { ThemedView } from '@/components/ThemedView';
import LottieAnimation from '@/components/lottie-animations/lottie-animation';
import studyHero from '@/components/lottie-animations/study-hero.json';
import ButtonMain from '@/components/buttons/button-main';
import Stopwatch from '@/components/stopwatch/Stopwatch';
import TermSwiper from '@/components/term-swiper';
import ButtonBack from '@/components/buttons/button-back';
import useGetUser from '@/utilities/hooks/useGetUser';
import { clearPassedGamesMutation, updateProgressMutation } from '@/app/services/queries/progress.query';
import Loader from '@/components/loader';


const Terms = () => {
  const [gameLive, setGameLive] = useState<boolean>(false);
  const { user, isLoading } = useGetUser();
  
  const userMappedData = {
    username: user?.firstName,
    progress: user?.progress, 
    points: user?.points,
    coins: user?.coins,
    difficultyLevel: user?.difficultyLevel,
    gamesPassed: user?.gamesPassed
  };

  const { mutate: updateProgress } = updateProgressMutation();
  const { mutate: clearPassedGames } = clearPassedGamesMutation();

  const progressUpdated = useRef(false);
  useEffect(() => {
    if (user) {
      if (!progressUpdated.current && userMappedData?.gamesPassed?.length >= MINIMUM_GAMES_PASSED) {
        clearPassedGames();
        progressUpdated.current = true;
        window.location.reload(); 
  
        updateProgress(
          { progress: PROGRESS_POINTS },
          {
            onSuccess: () => {
              clearPassedGames();
              window.location.reload();
            }
          }
        );
      }
    }
  }, [userMappedData, user]);

  const curProgress = userMappedData?.progress;
  const termsLevelBased = fetchTermsLevelBased(userMappedData?.difficultyLevel); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);


  if (isLoading) return <Loader />;

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

