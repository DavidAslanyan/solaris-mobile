import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import ButtonBack from '@/components/buttons/button-back'
import ThemeText from '@/components/themes/theme-text'
import ButtonMain from '@/components/buttons/button-main'
import Timer from '@/components/timer'
import FoodPlate from '@/components/food-plate'
import CommentBlock from '@/components/comment-block/CommentBlock'
import { ResponseEnum } from '@/utilities/enums/response.enum'
import Monster from '@/components/lottie-animations/lottie-monster'
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum'
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based'
import { PROGRESS_POINTS } from '@/constants/global-data'
import { fetchRandomTerms } from '@/utilities/functions/fetch-random-terms'
import { shuffleArray } from '@/utilities/functions/shuffle-array'
import { Colors } from '@/constants/Colors'
import Draggable from 'react-native-draggable'
import DraggableBox from '@/components/draggable-box'
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small'
import Popup from '@/components/popup'
import ErrorAnimation from '@/components/lottie-animations/lottie-error'
import ButtonMainSmall from '@/components/buttons/button-main-small'
import VictoryBlock from '@/components/victory-block'
import { useRouter } from 'expo-router'
import { GAME } from '@/constants/game-titles'
import * as Haptics from 'expo-haptics'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const rules = [
  "The monster is hungry and you need to feed him",
  "The monster is very bad at speaking so you will have to figure out what terms does he want",
  "He has a plate where you need to place the terms which trasnform into food for him",
  "Fill the plate with food until the monster the satisfied",
  "When the plate is full, press feed and feed the monster",
  "Note: The monster is very sensitive you grab a wrong term, he will get angry and you will loose",
  "So, pick think carefully before you grab one"
];

const TIMER_SECONDS = 100;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const FeedMonster = () => {
  const user = {
    progress: 5,
    difficultyLevel: DifficultyLevel.EASY
  };
  const gamesPassed: string[] = [];
  
  const router = useRouter();
  const [gameLive, setGameLive] = useState<boolean>(true);

  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<ResponseEnum | null>(null);
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [monstersQuestions, setMonstersQuestions] = useState<string[]>([]);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const curProgress = useMemo(() => user?.progress ?? 0, [user]);
  const termsLevelBased = useMemo(() => {
    return user ? fetchTermsLevelBased(user.difficultyLevel) : [];
  }, [user]);

  useEffect(() => {
    if (!timerRunning && !successPopupOpen && !failPopupOpen) {
      setTimeOverPopupOpen(true);
    }
  }, [timerRunning]);
  
  useEffect(() => {
    if (response === ResponseEnum.FAIL) {
      setTimerRunning(false);
      setFailPopupOpen(true);
    } else if (response === ResponseEnum.SUCCESS) {
      setSuccessPopupOpen(true);
      setTimerRunning(false);
    }
  }, [response]);

  useEffect(() => {
    if (user) {
      setMonstersQuestions(
        termsLevelBased
          .slice(curProgress, curProgress + PROGRESS_POINTS)
          .map((item) => item.shortExplanation)
      );
    }
  }, [curProgress, termsLevelBased]);
  
  const termsData = useMemo(() => {
    return termsLevelBased
      .slice(curProgress, curProgress + PROGRESS_POINTS)
      .map((item) => item.term);
  }, [curProgress, termsLevelBased]);
  
  const randomTerms = useMemo(() => {
    const fetchedTerms = fetchRandomTerms(5).map((term) => term.term);
    return Array.from(
      new Set(fetchedTerms.filter((term) => !termsData.includes(term)))
    );
  }, [step, termsData]);

  useEffect(() => {
    setShuffledTerms(shuffleArray([...termsData, ...randomTerms]));
  }, [termsData, randomTerms]);

  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [dropedX, setDropedX] = useState<any>();
  const [dropedY, setDropedY] = useState<any>();

  useEffect(() => {
    if (dropedX > 195 && dropedX < 400 &&
      dropedY > 270 && dropedY < 470
    ) {
      if (draggingItem?.toLowerCase() === termsData[step]?.toLowerCase()) {
        setStep((prev) => prev + 1);
        setShuffledTerms((prev) =>
          prev.filter(
            (term) => term.toLowerCase() !== draggingItem.toLowerCase()
          )
        );
        setDropedX(0);
        setDropedY(0);
        setDraggingItem(null);
      } else {
        setResponse(ResponseEnum.FAIL);
      }
    }
  }, [dropedX, dropedY]);

    const handleRetry = () => {
      router.replace('/pages/feed-monster');
    }
  
    const handleFailPopup = () => {
      router.replace('/pages/terms');
    }
  
    const handleSuccessPopup = () => {
      if (!gamesPassed.includes(GAME.FEED_MONSTER)) {
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
              <ThemeText size='xl' weight='bold' style={{paddingVertical: 10, textAlign: 'center'}}>Game 4 - Feed the Monster</ThemeText>
              <ThemeText size='md' weight='semibold' style={{paddingVertical: 10, textAlign: 'center'}}>Figure out what term the mosnter needs and feed him with it</ThemeText>
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
    <ThemedView style={styles.container}>
      <View style={styles.backButton}>
        <ButtonBack text='Back' />
      </View>

      <View style={[styles.timer, {
          paddingTop: SCREEN_WIDTH < 390 ? 20 : 70,
        }]}>
          <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
      </View>

      <ThemeText size='lg' weight='bold' style={{textAlign: 'center', paddingVertical: 10}}>Feed the Monster</ThemeText>

      <View style={styles.topRow}>
        <View style={{paddingLeft: '4%', width: 300}}>
          <CommentBlock 
            comment={monstersQuestions?.[step] ?? ''} 
            buttonActive={step === monstersQuestions.length} 
            setResponse={setResponse}
          />
          <Monster width={200} height={200} />
        </View>
        <View style={styles.foodPlate}>
          <FoodPlate step={step} />
        </View>
      </View>

      <View style={styles.lineWrapper}>
        <View style={styles.line} />
        <ThemeText size='md'>Find and Drop the Right Term into the Plate</ThemeText>
        <View style={styles.line} />
      </View>

      <View style={styles.buttonsList}>
        {shuffledTerms.map((item, index) => {
          const BUTTON_WIDTH = 100;
          const BUTTON_HEIGHT = 50;
          const GAP = 20;
          const NUM_COLS = Math.floor(SCREEN_WIDTH / (BUTTON_WIDTH + GAP));  
          const CONTAINER_PADDING = 20;

          const x = Math.min(CONTAINER_PADDING + (index % NUM_COLS) * (BUTTON_WIDTH + GAP), SCREEN_WIDTH - BUTTON_WIDTH - CONTAINER_PADDING);
          const y = Math.min(CONTAINER_PADDING + Math.floor(index / NUM_COLS) * (BUTTON_HEIGHT + GAP), SCREEN_HEIGHT - BUTTON_HEIGHT - CONTAINER_PADDING);

          return (
            <Draggable 
              onDrag={() => {
                setDraggingItem(item)
              }}
              onDragRelease={(e) => {
                const { pageX, pageY } = e.nativeEvent;
                setDropedX(pageX)
                setDropedY(pageY)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onPressIn={() => {
                setDraggingItem(item)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onLongPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              onPressOut={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              key={index} 
              x={x} 
              y={y}
              >
              <TouchableOpacity onPress={() => {
                setDraggingItem(item)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }} style={styles.button}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            </Draggable>
          );
        })}
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
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  foodPlate: {
    position: 'relative',
    top: 20,
    right: 60
  },
  line: {
    width: '6%',
    marginTop: 2, 
    height: 1,
    backgroundColor: Colors.thirdly,
    borderRadius: 2
  },
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  buttonsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: 10,
    paddingTop: 10,
    paddingHorizontal: '4%',
  },
  button: {
    backgroundColor: Colors.secondary,
    maxWidth: 200,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
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

export default FeedMonster;
