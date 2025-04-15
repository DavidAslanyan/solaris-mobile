import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ButtonMainSmall from '../buttons/button-main-small';
import { Colors } from '@/constants/Colors';
import ThemeText from '../themes/theme-text';
import { useAppTheme } from '@/app/contexts/ThemeContext';

export enum CheckedWordReponseEnum {
  SUCCESS = 'success',
  FAIL = 'fail',
}

type MissingWordStepProps = {
  term: string;
  explanation: string;
  setResponse: (arg: CheckedWordReponseEnum) => void;
};

const WORD_LENGTH = 4;
const UNDERLINE = '_';

const MissingWordStep: React.FC<MissingWordStepProps> = ({
  term,
  explanation,
  setResponse,
}) => {
  const { theme } = useAppTheme();
  const inputColor = theme === 'dark' ? Colors.white : Colors.secondary;
  const placeholderColor = theme === 'dark' ? Colors.darkThirdly : Colors.lowOpacityDark;

  const words = explanation.split(' ');
  const longWords = words.filter((word) => word.length >= WORD_LENGTH);

  const [inputValue, setInputValue] = useState<string>('');
  const [savedWord, setSavedWord] = useState<string | null>(null);

  useEffect(() => {
    if (longWords.length > 0) {
      setSavedWord(
        longWords[Math.floor(Math.random() * Math.min(3, longWords.length))],
      );
    }
  }, [term]);

  const formattedWords = useMemo(() => {
    return words.map((word) => (word === savedWord ? UNDERLINE : word));
  }, [words, savedWord]);

  const handleCheckClick = () => {
    if (inputValue.toLowerCase() === savedWord?.toLowerCase()) {
      setResponse(CheckedWordReponseEnum.SUCCESS);
    } else {
      setResponse(CheckedWordReponseEnum.FAIL);
    }
  };

  return (
    <View style={styles.container}>
      <ThemeText size='md' weight='medium'>Term: <ThemeText size='lg' weight='bold'>{term}</ThemeText></ThemeText>

      <View style={styles.wordsContainer}>
        {formattedWords.map((word, index) => {
          if (word === UNDERLINE) {
            return (
              <View key={index} style={[styles.underlineInputWrapper, { borderColor: inputColor }]}>
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Type here"
                  style={[styles.input, { color: inputColor }]}
                  placeholderTextColor={placeholderColor}
                />
              </View>
            );
          }
          return (
            <Fragment key={index}>
              <ThemeText size='md' weight='medium' style={{textAlign: 'center'}}>{word}</ThemeText>
            </Fragment>
          );
        })}
      </View>

      <View style={styles.buttonWrapper}>
        <ButtonMainSmall 
          onPress={handleCheckClick}
          disabled={inputValue === ''}
          title="Check My Word"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  wordsContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  underlineInputWrapper: {
    borderBottomWidth: 2,
    marginRight: 8,
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 8,
    minWidth: 60,
  },
  buttonWrapper: {
    paddingTop: 24,
  },
});

export default MissingWordStep;
