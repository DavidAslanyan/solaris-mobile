import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import EyeClosedIcon from '../icons/EyeClosedIcon';
import ThemeText from '../themes/theme-text';
import { useAppTheme } from '@/app/contexts/ThemeContext';

type InputProps = {
  label?: string;
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  isPassword?: boolean;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoCapitalize?: boolean;
};

const MAX_CHARS = 40;

const InputCustom: React.FC<InputProps> = ({
  label,
  value,
  icon,
  maxLength = MAX_CHARS,
  isPassword = false,
  placeholder = '',
  onChange,
  onBlur,
  error = '',
  required = false,
  disabled = false,
  autoCapitalize = false
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { theme } = useAppTheme();
  const themeColor = theme === 'light' ? Colors.secondary : Colors.white;
  const placeholderColor = theme === 'light' ? Colors.thirdly : Colors.darkThirdly;
  
  return (
    <View style={{ marginVertical: 7 }}>
      {label && (
        <ThemeText weight='semibold'>
          <>{label} {required && '*'}</>
        </ThemeText>
      )}

      <View style={{ position: 'relative', paddingTop: 8 }}>
        {icon && <View style={{ position: 'absolute', left: 10, top: 17 }}>{icon}</View>}

        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{ position: 'absolute', right: 10, top: 18, zIndex: 10 }}
          >
            {visible
            ? <EyeOpenIcon width={24} height={24} color={themeColor} />
            : <EyeClosedIcon width={24} height={24} color={themeColor} />
            }
          </TouchableOpacity>
        )}

        <TextInput
          autoCapitalize={autoCapitalize ? 'words' : 'none'}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
          autoCorrect={false}
          maxLength={maxLength}
          secureTextEntry={isPassword ? !visible : false}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={!disabled}
          style={{
            width: "100%",
            paddingLeft: icon ? 40 : 10,
            paddingRight: isPassword ? 40 : 10,
            height: 45,
            borderColor: error === "" ? themeColor : Colors.red,
            borderWidth: 1,
            borderRadius: 5,
            fontWeight: 'semibold',
            fontSize: 16,
            color: themeColor,
          }}
        />
      </View>

      {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}
    </View>
  );
};

export default InputCustom;
