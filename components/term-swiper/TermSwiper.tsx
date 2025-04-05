import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import ThemeText from '../themes/theme-text';
import ButtonMainSmall from '../buttons/button-main-small';
import ButtonSecondarySmall from '../buttons/button-secondary-small';
import Popup from '../popup';
import termsLearned from '@/components/lottie-animations/terms-learned.json';
import LottieAnimation from '../lottie-animations/lottie-animation';
import { router } from 'expo-router';

type TermProps = {
  id: number;
  term: string;
  shortExplanation: string;
  longExplanation: string;
};

type TermSwiperProps = {
  data: TermProps[];
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TermSwiper: React.FC<TermSwiperProps> = ({ data }) => {
  const scrollRef = useRef<ScrollView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: SCREEN_WIDTH * index, animated: true });
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    } else {
      setPopupOpen(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToIndex(prevIndex);
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(newIndex);
  };

  const handlePopup = () => {
    setPopupOpen(false);
    router.replace('/(tabs)/games')
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {data.map((item: TermProps, index: number) => (
          <View style={[styles.block, { width: SCREEN_WIDTH }]} key={index}>
            <ThemeText size="lg" weight="bold" style={{ textAlign: 'center' }}>
              Term {index + 1}. {item.term}
            </ThemeText>
            <ThemeText
              size="lg"
              weight="semibold"
              style={{ textAlign: 'center', paddingVertical: '4%' }}
            >
              {item.shortExplanation}
            </ThemeText>
            <ThemeText size="md">Explanation: {item.longExplanation}</ThemeText>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <ButtonSecondarySmall title='Previous' onPress={handlePrev} disabled={currentIndex === 0} />

        <ButtonMainSmall title={currentIndex === data.length - 1 ? 'Finish' : 'Next term'} onPress={handleNext} />
      </View>

      <Popup isOpen={popupOpen} setIsOpen={setPopupOpen}>
        <View style={styles.popupContent}>
          {popupOpen &&
          <LottieAnimation src={termsLearned} loop={false} />
          }
          <ThemeText size='md' weight='semibold' style={{textAlign: 'center'}}>Congrats, you learned some new terms!</ThemeText>
          <ThemeText size='md' style={{textAlign: 'center', paddingVertical: '3%'}}>Now it's time to practice to make it stick. Are you ready to test your knowledge?</ThemeText>

          <View style={styles.popupButtons}>
            <ButtonSecondarySmall title='Close' onPress={() => setPopupOpen(false)} disabled={currentIndex === 0} />

            <ButtonMainSmall title='Proceed to Games' onPress={handlePopup} />
          </View>
        </View>
      </Popup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  block: {
    height: 400,
    paddingHorizontal: '1%',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 24,
  },
  popupContent: {
    alignItems: 'center',
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 24,
    gap: '5%'
  }
});

export default TermSwiper;
