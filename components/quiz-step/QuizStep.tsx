import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonQuizStep, { QuizButtonForm } from '../buttons/button-quiz-step/ButtonQuizStep';
import ThemeText from '../themes/theme-text';

type QuizStepProps = {
  term: string;
  answer: string;
  shuffledOptions?: string[];
  selectedOption: string;
  selectOption: (arg: string) => void;
  setResponse: (arg: QuizButtonForm | '') => void;
};

const QuizStep: React.FC<QuizStepProps> = ({
  term,
  answer,
  shuffledOptions = [],
  selectedOption,
  selectOption,
  setResponse,
}) => {
  const handleClick = (option: string) => {
    if (selectedOption === '') {
      selectOption(option);
      setResponse(option === answer ? QuizButtonForm.SUCCESS : QuizButtonForm.ERROR);
    }
  };

  const checkButtonColor = (option: string): QuizButtonForm => {
    if (selectedOption === '') return QuizButtonForm.DEF;
    if (option === answer) return QuizButtonForm.SUCCESS;
    if (option === selectedOption) return QuizButtonForm.ERROR;
    return QuizButtonForm.DEF;
  };

  return (
    <View style={styles.container}>
      <ThemeText size='lg' style={{ textAlign: 'center', paddingVertical: 10 }}>What does this mean? - <ThemeText weight='bold' size='lg'>{term}</ThemeText></ThemeText>
      <View style={{gap: 10, paddingTop: 10,}}>
      {shuffledOptions.map((item, index) => (
          <View key={index} >
            <ButtonQuizStep
              form={checkButtonColor(item)}
              title={item}
              onPress={() => handleClick(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default QuizStep;
