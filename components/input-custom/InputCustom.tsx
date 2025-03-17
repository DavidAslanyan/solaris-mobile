import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import EyeClosedIcon from '../icons/EyeClosedIcon';

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
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={{ marginBottom: 10 }}>
      {label && (
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
          {label} {required && '*'}
        </Text>
      )}

      <View style={{ position: 'relative' }}>
        {icon && <View style={{ position: 'absolute', left: 10, top: 10 }}>{icon}</View>}

        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
          >
            {visible
            ? <EyeOpenIcon color={Colors.dark.background} />
            : <EyeClosedIcon color={Colors.dark.background} />
            }
          </TouchableOpacity>
        )}

        <TextInput
          maxLength={maxLength}
          secureTextEntry={isPassword ? !visible : false}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={!disabled}
          style={{
            width: "100%",
            paddingLeft: icon ? 40 : 10,
            paddingRight: isPassword ? 40 : 10,
            height: 45,
            borderColor: Colors.light.text,
            borderWidth: 2,
            borderRadius: 5,
            fontSize: 16,
            color: Colors.light.text,
          }}
        />
      </View>

      {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}
    </View>
  );
};

export default InputCustom;
