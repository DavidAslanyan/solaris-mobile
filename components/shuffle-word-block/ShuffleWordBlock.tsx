import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OTPInput from '../otp-input';
import { ResponseEnum } from '@/utilities/enums/response.enum';
import ButtonMainSmall from '../buttons/button-main-small';
import { Colors } from '@/constants/Colors';
import ThemeText from '../themes/theme-text';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const smallDevice = SCREEN_WIDTH < 390;

type ShuffleWordStepProps = {
  term: string;
  explanation: string;
  response: ResponseEnum | null;
  setResponse: (arg: ResponseEnum) => void;
};

function shuffleString(str: string): string {
  return str
    .toUpperCase()
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

const ShuffleWord: React.FC<ShuffleWordStepProps> = ({
  term,
  explanation,
  response,
  setResponse,
}) => {
  const [shuffledTerm, setShuffledTerm] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    setShuffledTerm(shuffleString(term));
  }, [term]);

  const handleCheckClick = () => {
    if (otp.toLowerCase() === term.toLowerCase()) {
      setResponse(ResponseEnum.SUCCESS);
    } else {
      setResponse(ResponseEnum.FAIL);
    }
  };

  const handleComplete = () => {};

  return (
    <View style={styles.container}>
      <Text style={[styles.termText, { fontSize: smallDevice ? 24 : 32 },  response === ResponseEnum.SUCCESS && styles.success]}>
        {response === ResponseEnum.SUCCESS ? term.toUpperCase() : shuffledTerm}
      </Text>
     <ThemeText size='md' weight='medium'>Hint: {explanation}</ThemeText>

      <View style={styles.otpContainer}>
        <OTPInput
          response={response}
          length={shuffledTerm.length}
          onChange={setOtp}
          onComplete={handleComplete}
        />
      </View>

      <ButtonMainSmall
        title="Check my word"
        onPress={handleCheckClick}
        disabled={otp.length !== term.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  termText: {
    fontWeight: '600',
    letterSpacing: 4,
    backgroundColor: Colors.secondary, 
    color: Colors.primary, 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  success: {
    backgroundColor: Colors.secondary,
  },
  hintText: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 10,
  },
  otpContainer: {
    marginVertical: 20,
  },
});

export default ShuffleWord;
