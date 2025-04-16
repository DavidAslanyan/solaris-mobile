import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import RegisterHeroAnimation from '../lottie-animations/lottie-register-hero';
import Programmer from '../lottie-animations/lottie-programmer';
import Robot from '../lottie-animations/lottie-robot';
import ThemeText from '../themes/theme-text';
import ButtonSecondarySmall from '../buttons/button-secondary-small';
import ButtonMainSmall from '../buttons/button-main-small';
import { Colors } from '@/constants/Colors';


type SelectDifficultyProps = {
  difficulty: string;
  setDifficultyPopupOpen: (arg: boolean) => void;
}

const SelectDifficulty: React.FC<SelectDifficultyProps> = ({
  difficulty,
  setDifficultyPopupOpen
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  
  const levels = [
    {
      title: "Student - Easy",
      description: "Start simple! Perfect for beginners or those with a little IT knowledge.",
      icon: <RegisterHeroAnimation width={145} height={150} />,
      level: DifficultyLevel.EASY
    },
    {
      title: "Specialist - Medium",
      description: "Step it up! If you already know your way around IT.",
      icon: <Programmer width={140} height={150}/>,
      level: DifficultyLevel.MEDIUM
    },
    {
      title: "IT Master - Hard",
      description: "Only for the brave! Test your mastery with complex terms and tough challenges",
      icon: <Robot width={150} height={150}/>,
      level: DifficultyLevel.HARD
    }
  ];
  
  return (
    <View>
     <ThemeText size='md' weight='bold' style={{textAlign: 'center', paddingBottom: 10}}>Select Difficulty</ThemeText>

     <View style={{gap: 10}}>
      {levels.map((level, index) => (
        <TouchableOpacity onPress={() => setSelectedDifficulty(level.level)} key={index} style={selectedDifficulty === level.level ? styles.selected : styles.contianer}>
          <View>{level.icon}</View>
          <View style={{width: 200}}>
            <ThemeText size='md' weight='semibold'>{level.title}</ThemeText>
            <ThemeText>{level.description}</ThemeText>
            {selectedDifficulty === level.level &&
            <Text style={styles.activeText}>Active</Text>}
          </View>
        </TouchableOpacity>
      ))}
     </View>

     <View style={styles.buttons}>
      <ButtonSecondarySmall onPress={() => setDifficultyPopupOpen(false)} title='Cancel' />
      <ButtonMainSmall onPress={() => setDifficultyPopupOpen(false)} title='Save Changes' />
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contianer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.thirdly,
    borderRadius: 8,
    position: 'relative'
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
    position: 'relative'
  },
  buttons: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  activeText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    position: 'absolute',
    top: 70,
    left: 30
  }
})

export default SelectDifficulty