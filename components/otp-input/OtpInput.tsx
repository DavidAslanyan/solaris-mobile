import { useAppTheme } from '@/app/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ResponseEnum } from '@/utilities/enums/response.enum';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Dimensions,
} from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const smallDevice = SCREEN_WIDTH < 390;

interface OTPInputProps {
  length?: number;
  response: ResponseEnum | null;
  onChange: (otp: string) => void;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  response,
  onChange,
  onComplete,
}) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const { theme } = useAppTheme();
  const bakcgroundColor = theme === 'dark' ? Colors.darkerBackgorund : Colors.backPrimary;
  const borderColor = theme === 'dark' ? Colors.thirdly : Colors.secondary;
  const color = theme === 'dark' ? Colors.white : Colors.secondary;

  useEffect(() => {
    onChange(otp.join(''));
    if (otp.every((digit) => digit !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp]);

  const handleChange = (index: number, char: string) => {
    if (char.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = char;
    setOTP(updatedOtp);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, char: string) => {
    const updatedOtp = [...otp];
    if (char !== '') {
      updatedOtp[index] = '';
      setOTP(updatedOtp);
      return;
    }
    if (index > 0) {
      updatedOtp[index - 1] = '';
      setOTP(updatedOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };
  

  const match = response === ResponseEnum.SUCCESS;

  return (
    <View style={styles.container}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            style={[
              styles.input,
              {
                width: smallDevice ? 32 : 42,
                height: smallDevice ? 40 : 54,
                fontSize: smallDevice ? 14 : 18,
                backgroundColor: match ? Colors.secondary : bakcgroundColor,
                color: match ? Colors.primary : color,
                borderColor: borderColor,
              },
            ]}
            maxLength={1}
            onChangeText={(char) => handleChange(index, char.toUpperCase())}
            onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
              if (e.nativeEvent.key === 'Backspace') {
                handleBackspace(index, otp[index]);
              }
            }}
            value={otp[index]}
            editable={!match}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '4%'
  },
  input: {
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: '600',
    borderWidth: 1,
  },
});

export default OTPInput;
