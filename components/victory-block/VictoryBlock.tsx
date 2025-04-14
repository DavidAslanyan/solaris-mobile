import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ThemeText from '../themes/theme-text';
import Coins from '../lottie-animations/lottie-coins';
import LottieAnimation from '../lottie-animations/lottie-animation';
import termsLearned from '@/components/lottie-animations/terms-learned.json';
import { Colors } from '@/constants/Colors';
import ButtonMain from '../buttons/button-main';


type VictoryBlockProps = {
  isOpen: boolean;
  handleSuccessPopup: () => void;
  coins: number;
  points: number;
}

const VictoryBlock: React.FC<VictoryBlockProps> = ({
  isOpen,
  handleSuccessPopup,
  points,
  coins
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory</Text>
      <LottieAnimation src={termsLearned} loop={false} />
      <ThemeText size='md' style={{textAlign: 'center'}}>Congrats, you successfully passed the game!</ThemeText>
      <ThemeText size='md' style={{textAlign: 'center'}}>Here are your rewards</ThemeText>
      <View style={styles.buttonsContainer}>
        <ThemeText size='md' weight='semibold'>+XP {points} points</ThemeText>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isOpen && <Coins />}
          <ThemeText size='md' weight='semibold'>+ {coins} coins</ThemeText>
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <ButtonMain onPress={handleSuccessPopup} title='Proceed to other Games' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: Colors.primary,
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default VictoryBlock;
