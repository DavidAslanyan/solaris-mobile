import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import ButtonBack from '@/components/buttons/button-back'
import ThemeText from '@/components/themes/theme-text'
import ButtonMain from '@/components/buttons/button-main'
import Timer from '@/components/timer'
import { useRouter } from 'expo-router'
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum'
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based'
import { shuffleArray } from '@/utilities/functions/shuffle-array'
import { PROGRESS_POINTS } from '@/constants/global-data'
import MissingWordStep from '@/components/missing-word-step'
import { CheckedWordReponseEnum } from '@/components/missing-word-step/MissingWordStep'
import ButtonMainSmall from '@/components/buttons/button-main-small'
import { Colors } from '@/constants/Colors'
import { GAME } from '@/constants/game-titles'
import Popup from '@/components/popup'
import VictoryBlock from '@/components/victory-block'
import ErrorAnimation from '@/components/lottie-animations/lottie-error'
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small'
import KeyboardAvoidingWrapper from '@/components/keyboard-avoid-wrapper'


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const rules = [
  "A short explanation of one the learned terms will be shown to you",
  "However, one of the words will be missing",
  "Select the correct explanation to move forward.",
  "You will have to type the missing word by yourself and click check",
  "You have 1 minute to complete all 5 terms",
  "That's it, continue the same steps for the rest of the terms",
  "If you passed all, Congrats, you won Game 2",
  "You are ready to proceed to the next games"
];

const TIMER_SECONDS = 60;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const MissingWord = () => {
  const router = useRouter();
  const user = {
    progress: 0,
    difficultyLevel: DifficultyLevel.EASY
  };
  const gamesPassed: string[] = [];
  const [gameLive, setGameLive] = useState<boolean>(false);

  const [step, setStep] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [response, setResponse] = useState<CheckedWordReponseEnum | null>(null);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const curProgress = user?.progress ?? 0; 
  const termsLevelBased = user ? fetchTermsLevelBased(user.difficultyLevel) : []; 
  const termData = useMemo(() => shuffleArray(termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS)), [curProgress]);
  
  useEffect(() => {
    if (!timerRunning && !successPopupOpen && !failPopupOpen) {
      setTimeOverPopupOpen(true);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (response === CheckedWordReponseEnum.FAIL) {
      setTimerRunning(false);
      setFailPopupOpen(true);
    }
  }, [response]);

  const handleRetry = () => {
    router.replace('/pages/missing-word');
  }

  const handleFailPopup = () => {
    router.replace('/pages/terms');
  }

  const handleSuccessPopup = () => {
    if (!gamesPassed.includes(GAME.MISSING_WORD)) {
      // savePassedGame();
    } else {
      router.replace('/(tabs)/games');
    }
  }
    

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newStep = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (newStep !== step) {
      setStep(newStep);
    }
  }


  const scrollToStep = (stepIndex: number) => {
    if (scrollViewRef.current && stepIndex < termData.length) {
      scrollViewRef.current.scrollTo({ x: stepIndex * SCREEN_WIDTH, animated: true });
      setStep(stepIndex);
    } else {
      setTimerRunning(false);
      setSuccessPopupOpen(true);
    }
  }
  
  if (!gameLive) {
    return (
      <ThemedView style={styles.rulesContainer}>
        <View style={styles.backButton}>
          <ButtonBack text='Back' />
        </View>
        <View>
          <View>
            <ThemeText size='xl' weight='bold' style={{paddingVertical: 10, textAlign: 'center'}}>Game 2 - Missing Word</ThemeText>
            <ThemeText size='md' weight='semibold' style={{paddingVertical: 10, textAlign: 'center'}}>Find the missing words in the terms' explanations to test your recently learnt</ThemeText>
            <View style={styles.rules}>
              {rules.map((data, index) => (
                <Fragment key={index}>
                  <ThemeText size='md' weight='medium'>{index + 1}. {data}</ThemeText>
                </Fragment>
              ))}
            </View>
          </View>

          <View>
            {/* VIDEO */}
          </View>
        </View>
        <View style={{paddingTop: 16}}>
          <ButtonMain onPress={() => setGameLive(true)} title='Start the Game'/>
        </View>
      </ThemedView>
    )
  }

  return (
    <KeyboardAvoidingWrapper>
      <ThemedView style={styles.container}>
        <View style={styles.backButton}>
          <ButtonBack text='Back' />
        </View>

        <View style={styles.timer}>
          <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
        </View>
        
        <View style={styles.headerContainer}>
          <ThemeText size='lg' weight='bold'>Missing Word</ThemeText>
          <ThemeText size='md' weight='medium'>Question {step + 1} of {termData.length}</ThemeText>
        </View>

        <View>
          <ScrollView 
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
            scrollEnabled={false}
          >
            {termData.map((item, index) => (
              <View key={index} style={{flex: 1, width: SCREEN_WIDTH, alignSelf: 'center'}}>
                <MissingWordStep
                  setResponse={setResponse}
                  term={item.term}
                  explanation={item.shortExplanation}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          {response === CheckedWordReponseEnum.SUCCESS &&
          <View>
            <Text style={styles.correctText}>Correct, Well Done !</Text>
            <ButtonMain 
              onPress={() => { 
                scrollToStep(step + 1);
                setResponse(null);
              }}
              title={step < termData.length - 1 ? "Next Question" : "Finish"}
            />
          </View>
          }
        </View>


        <Popup isOpen={successPopupOpen} setIsOpen={() => {}}>
          <VictoryBlock 
            isOpen={successPopupOpen} 
            handleSuccessPopup={handleSuccessPopup} 
            coins={REWARD_COINS}
            points={REWARD_POINTS}
          />
        </Popup>

        <Popup isOpen={failPopupOpen} setIsOpen={() => {}}>
          <View style={styles.failContainer}>
            {failPopupOpen && <ErrorAnimation />}
            <Text style={styles.failTitle}>Failed</Text>
            <ThemeText size='md' weight='medium' style={{paddingVertical: 10}}>No worries, with failures we learn as well!</ThemeText>
            <ButtonMainSmall onPress={handleRetry} title='Try Again' />
            <ThemeText style={{paddingVertical: 10}}>Or</ThemeText>
            <ButtonSecondarySmall onPress={handleFailPopup} title='Return to Terms' />
          </View>
        </Popup>

        <Popup isOpen={timeOverPopupOpen} setIsOpen={() => {}}>
          <View style={styles.failContainer}>
            {timeOverPopupOpen && <ErrorAnimation />}
            <Text style={styles.failTitle}>Failed</Text>
            <ThemeText size='md' weight='medium' style={{paddingVertical: 10, paddingHorizontal: 60}}>Sorry, your time is over</ThemeText>
            <ButtonMainSmall onPress={handleRetry} title='Try Again' />
            <ThemeText style={{paddingVertical: 10}}>Or</ThemeText>
            <ButtonSecondarySmall onPress={handleFailPopup} title='Return to Terms' />
          </View>
        </Popup>
      </ThemedView>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rulesContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '4%'
  },
  rules: {
    gap: 7
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 60,
    zIndex: 10
  },
  timer: {
    paddingTop: 150,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  correctText: {
    fontWeight: '700',
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 18
  },
  failContainer: {
    alignItems: 'center'
  },
  failTitle: {
    fontWeight: '600',
    color: Colors.red,
    fontSize: 24,
    textAlign: 'center'
  }
})

export default MissingWord;

