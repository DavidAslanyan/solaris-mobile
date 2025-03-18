import { StyleSheet, View, useColorScheme, Modal } from 'react-native'
import React, { useState } from 'react'
import { LoginUserFormType } from '@/utilities/types/auth.type';
import { ResponseEnum } from '@/utilities/enums/response.enum';
import ThemeView from '@/components/themes/theme-view';
import { REGEX_EMAIL, REGEX_PASSWORD } from '@/constants/regex-statements';
import ThemeText from '@/components/themes/theme-text';
import InputCustom from '@/components/input-custom/InputCustom';
import EmailIcon from '@/components/icons/EmailIcon';
import LockIcon from '@/components/icons/LockIcon';
import { Colors } from '@/constants/Colors';
import ErrorMessage from '@/components/error-message';
import ButtonMain from '@/components/buttons/button-main';
import { Link, router, useRouter } from 'expo-router';
import ErrorAnimation from '@/components/lottie-animations/lottie-error';
import { loginUserMutation } from '../services/queries/auth.query';
import { HttpStatusCode } from '@/utilities/enums/status-codes.enum';
import Popup from '@/components/popup';


const Login = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColor = colorScheme === 'light' ? Colors.secondary : Colors.white;
  const [formData, setFormData] = useState<LoginUserFormType>({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState<ResponseEnum | null>(null);

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: loginUser } = loginUserMutation();
  
  const handleLogin = (formData: LoginUserFormType) => {
    loginUser(formData, {
      onSuccess: (data) => {
        if (data?.status === HttpStatusCode.ACCEPTED) {
          router.replace("/(tabs)");
        } else {
          setModalVisible(ResponseEnum.FAIL);
          setErrorMessage(data?.error);
        }
      },
      onError: (error) => {
        setModalVisible(ResponseEnum.FAIL);
        console.log("Error registering user:", error);
      },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (validateInputs()) {
      handleLogin(formData);
    }
  }

  const validateInputs = (): boolean => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Please, fill in all the required fields");
      return false;
    }

    if (!REGEX_EMAIL.test(formData.email)) {
      setErrorMessage("Please provide a your valid email address");
      return false;
    }

    if (!REGEX_PASSWORD.test(formData.password)) {
      setErrorMessage("Password requirements: 8 characters, an uppercase, owercase, umber, special character");
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Your password must contain at least 8 characters");
      return false;
    } 

    setErrorMessage("");
    return true;
  }

  
  return (
    <ThemeView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemeText weight='bold' size='2xl'>LOGO</ThemeText>
      </View>

      <View style={styles.inputContainer}>
        <InputCustom
          maxLength={120}
          onChange={(text) => handleFormChange('email', text)}
          value={formData.email}
          label="Email"
          icon={<EmailIcon color={themeColor} />}
          placeholder="example@gmail.com"
        />

        <InputCustom
          isPassword={true}
          onChange={(text) => handleFormChange('password', text)}
          value={formData.password}
          label="Password"
          icon={<LockIcon color={themeColor} />}
        />
      </View>

      {errorMessage &&
      <ErrorMessage>{errorMessage}</ErrorMessage>
      }

      <ThemeText style={styles.haveAccountText}>Don't have an account? <Link style={styles.linkText} href={'/register'}>Sign Up</Link></ThemeText>
 
      <View style={styles.buttonConainer}>
        <ButtonMain 
          onPress={handleSubmit} 
          title={"Sign In"} 
        />
      </View>

      <Popup
        isOpen={modalVisible !== null}
        setIsOpen={setModalVisible}
        >
        <ErrorAnimation width={120} height={120} />
        <ThemeText  style={styles.modalText}>Failed to autheticate: {errorMessage}</ThemeText>
        <ButtonMain onPress={() => setModalVisible(null)} title='Try Again' />
      </Popup>

    </ThemeView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '12%',
  },

  logoContainer: {
    alignSelf: 'center',
    paddingVertical: '10%'
  },

  inputContainer: {
    paddingHorizontal: '4%'
  },

  buttonConainer: {
    paddingTop: '5%'
  },

  haveAccountText: {
    paddingHorizontal: '4%',
    paddingTop: '2%'
  },

  linkText: {
    fontWeight: "700",
    color: Colors.primary
  },

  errorMessage: {
    paddingHorizontal: "4%",
    color: Colors.red,
    fontWeight: "600"
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login

