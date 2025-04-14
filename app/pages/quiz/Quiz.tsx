import { View, Text, StyleSheet, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { Fragment, useMemo, useState, useRef, useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView';
import ButtonBack from '@/components/buttons/button-back';
import ThemeText from '@/components/themes/theme-text';
import ButtonMain from '@/components/buttons/button-main';
import { QuizButtonForm } from '@/components/buttons/button-quiz-step/ButtonQuizStep';
import { fetchRandomTerms } from '@/utilities/functions/fetch-random-terms';
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based';
import { shuffleArray } from '@/utilities/functions/shuffle-array';
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import { PROGRESS_POINTS } from '@/constants/global-data';
import QuizStep from '@/components/quiz-step';
import Timer from '@/components/timer';
import Popup from '@/components/popup';
import VictoryBlock from '@/components/victory-block';
import { GAME } from '@/constants/game-titles';
import ErrorAnimation from '@/components/lottie-animations/lottie-error';
import { Colors } from '@/constants/Colors';
import ButtonMainSmall from '@/components/buttons/button-main-small';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TIMER_SECONDS = 45;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const rules = [
  "You'll be shown a term that you've learned.",
  "Below it, you'll see a list of possible explanations.",
  "Select the correct explanation to move forward.",
  "Keep going until you've answered all the terms correctly.",
  "That's it, continue the same steps for the rest of the terms",
  "If you passed all, Congrats, you won Game-1",
  "You are ready to proceed to the next games"
];

const Quiz = () => {
  const router = useRouter();
  const user = {
    progress: 0,
    difficultyLevel: DifficultyLevel.EASY
  };
  const gamesPassed: string[] = [];

  const [gameLive, setGameLive] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [responses, setResponses] = useState<(QuizButtonForm | "")[]>([]);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const curProgress = user?.progress ?? 0; 
  const termsLevelBased = user ? fetchTermsLevelBased(user.difficultyLevel) : []; 
  const termData = useMemo(() => shuffleArray(termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS)), [curProgress]);
  
 
  const allShuffledOptions = useMemo(() => {
    return termData.map((term, index) => {
      let uniqueRandomTerms = new Set<string>();
    
      while (uniqueRandomTerms.size < 3) {
        const randomTerm = fetchRandomTerms(1)[0].shortExplanation;
        if (randomTerm !== term.shortExplanation) {
          uniqueRandomTerms.add(randomTerm);
        }
      }
    
      const options = [...uniqueRandomTerms];
      const randomIndex = Math.floor(Math.random() * (options.length + 1));
    
      options.splice(randomIndex, 0, term.shortExplanation);
    
      return options;
    });
  }, [termData]);


  useEffect(() => {
    setSelectedOptions(new Array(termData.length).fill(""));
    setResponses(new Array(termData.length).fill(""));
  }, [termData.length]);


  useEffect(() => {
    if (responses[step] === QuizButtonForm.ERROR) {
      setTimerRunning(false);
      setFailPopupOpen(true);
    }
  }, [responses, step]);

  const handleSelect = (option: string, index: number) => {
    if (selectedOptions[index] === "") {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = option;
      setSelectedOptions(newSelectedOptions);
    }
  }

  const handleSetResponse = (response: QuizButtonForm | "", index: number) => {
    const newResponses = [...responses];
    newResponses[index] = response;
    setResponses(newResponses);
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

  const handleRetry = () => {
    router.replace('/pages/quiz');
  }

  const handleFailPopup = () => {
    router.replace('/pages/terms');
  }

  const handleSuccessPopup = () => {
    if (!gamesPassed.includes(GAME.QUIZ)) {
      // savePassedGame();
    } else {
      router.replace('/(tabs)/games');
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
            <ThemeText size='xl' weight='bold' style={{paddingVertical: 10, textAlign: 'center'}}>Game 1 - Quiz</ThemeText>
            <ThemeText size='md' weight='semibold' style={{paddingVertical: 10, textAlign: 'center'}}>Take a quiz to test your recently learnt terms</ThemeText>
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
        <ButtonMain onPress={() => setGameLive(true)} title='Start the Game'/>
      </ThemedView>
    )
  }
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.backButton}>
        <ButtonBack text='Back' />
      </View>

      <View style={styles.timer}>
        <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
      </View>
      
      <View style={styles.headerContainer}>
        <ThemeText size='lg' weight='bold'>Quiz Game</ThemeText>
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
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={false}
        >
          {termData.map((item, index) => (
            <View style={styles.quizStepContainer} key={index}>
              <QuizStep
                term={item.term}
                answer={item.shortExplanation}
                selectedOption={selectedOptions[index]}
                selectOption={(option) => handleSelect(option, index)}
                shuffledOptions={allShuffledOptions[index]}
                setResponse={(response) => handleSetResponse(response, index)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.navigationContainer}>
        <ButtonMain 
          title={step < termData.length - 1 ? "Next Question" : "Finish"} 
          onPress={() => {
            if (selectedOptions[step] !== "") {
              scrollToStep(step + 1);
            }
          }}
          disabled={selectedOptions[step] === ""}
        />
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
          <ThemeText size='md' weight='medium' style={{paddingVertical: 10}}>Sorry, your time is over</ThemeText>
          <ButtonMainSmall onPress={handleRetry} title='Try Again' />
          <ThemeText style={{paddingVertical: 10}}>Or</ThemeText>
          <ButtonSecondarySmall onPress={handleFailPopup} title='Return to Terms' />
        </View>
      </Popup>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rulesContainer: {
    flex: 1,
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
    paddingTop: 100,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  scrollView: {
    
  },
  scrollViewContent: {
    
  },
  quizStepContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  navigationContainer: {
    paddingTop: 30,
    alignSelf: 'center'
  },
  navButton: {
    paddingTop: 30,
    marginHorizontal: 5,
  },
  disabledButton: {
    opacity: 0.5,
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

export default Quiz;

