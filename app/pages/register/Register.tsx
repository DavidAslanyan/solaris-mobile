import { View, StyleSheet, useColorScheme, TouchableOpacity, Modal } from 'react-native'
import { Link, router } from 'expo-router';
import React, { useState } from 'react'
import InputCustom from '@/components/input-custom/InputCustom';
import EmailIcon from '@/components/icons/EmailIcon';
import LockIcon from '@/components/icons/LockIcon';
import ButtonMain from '@/components/buttons/button-main';
import ThemeView from '@/components/themes/theme-view';
import ThemeText from '@/components/themes/theme-text';
import { Colors } from '@/constants/Colors';
import { REGEX_EMAIL, REGEX_PASSWORD } from '@/constants/regex-statements';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import { AVATARS } from '@/constants/shop-items';
import SignUpStep from '@/components/signup-step';
import ErrorMessage from '@/components/error-message';
import { ResponseEnum } from '@/utilities/enums/response.enum';
import CheckedAnimation from '@/components/lottie-animations/lottie-checked';
import ErrorAnimation from '@/components/lottie-animations/lottie-error';
import { registerUserMutation } from '../../services/queries/auth.query';
import { RegisterUserFormType } from '@/utilities/types/auth.type';
import { HttpStatusCode } from '@/utilities/enums/status-codes.enum';
import Popup from '@/components/popup';



const Register = () => {
  const colorScheme = useColorScheme();
  const themeColor = colorScheme === 'light' ? Colors.secondary : Colors.white;
  const [step, setStep] = useState<number>(0);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: "",
  });
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(DifficultyLevel.EASY);
  const [avatar, setAvatar] = useState<string>(AVATARS.male1);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState<ResponseEnum |null>(null);

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: registerUser } = registerUserMutation();
  const handleRegister = (formData: RegisterUserFormType) => {
    registerUser(formData, {
      onSuccess: (data) => {
        if (data?.status === HttpStatusCode.CREATED) {
          setModalVisible(ResponseEnum.SUCCESS);
        } else {
          setModalVisible(ResponseEnum.FAIL);
          setErrorMessage(data?.error);
        }
      },
      onError: (error) => {
        console.log("Error registering user:", error);
        setModalVisible(ResponseEnum.FAIL);
      },
    });
  };

  const validateFirstStepInputs = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.rPassword) {
      setErrorMessage("Please, fill in all the required fields");
      return false;
    }

    if (!REGEX_EMAIL.test(formData.email)) {
      setErrorMessage("Please provide a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters");
      return false;
    } 

    if (!REGEX_PASSWORD.test(formData.password)) {
      setErrorMessage("Password requirements: 8 characters, an uppercase, owercase, umber, special character");
      return false;
    }

    if (formData.password !== formData.rPassword) {
      setErrorMessage("Passwords don't match");
      return false;
    }

    setErrorMessage("");
    return true;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (validateFirstStepInputs()) {
      const finalFormData = { ...formData, difficultyLevel, avatarUrl: avatar };
      handleRegister(finalFormData);
    }
  }

  const handleContniue = () => {
    if (validateFirstStepInputs()) {
      setStep(step + 1);
    }
  }

  const handleBack = () => {
    setStep(step - 1);
  }

  const handleLoginPress = () => {
    setModalVisible(null);
    router.push('/pages/login');
  }

  
  return (
    <ThemeView style={styles.container}>
      <View style={styles.animationContainer}>
        <ThemeText weight='bold' size='2xl'>LOGO</ThemeText>
      </View>
      <ThemeText style={styles.title} size='lg' weight='bold'>
        {step === 0 ? "Become a member of our great community" : "One final step" }
      </ThemeText>

      {step === 1 &&
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.arrow}>
            <ArrowIcon width={24} />
          </View>
          <ThemeText weight='bold'>Back</ThemeText>
        </TouchableOpacity>
      } 

      {step === 0
      ? 
      <View style={styles.inputContainer}>
        <View style={styles.inputsTop}>
          <View style={styles.input}>
            <InputCustom 
              maxLength={25}
              onChange={(text) => handleFormChange('firstName', text)}
              value={formData.firstName}
              label="First Name"
              placeholder="John"
              />
          </View>

          <View style={styles.input}>
            <InputCustom 
              maxLength={25}
              onChange={(text) => handleFormChange('lastName', text)}
              value={formData.lastName}
              label="Last Name"
              placeholder="Doe"
              />
          </View>
        </View>

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

        <InputCustom
          isPassword={true}
          onChange={(text) => handleFormChange('rPassword', text)}
          value={formData.rPassword}
          label="Confirm Password"
          icon={<LockIcon color={themeColor} />}
        />
      </View>
      : 
      <View style={styles.inputContainer}>
        <SignUpStep
          avatar={avatar}
          setAvatar={setAvatar}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
         />
      </View>
      }

      {errorMessage &&
      <ErrorMessage>{errorMessage}</ErrorMessage>
      }

      <ThemeText style={styles.haveAccountText}>Already have an account? <Link style={styles.linkText} href={'/pages/login'}>Login</Link></ThemeText>
 
      <View style={styles.buttonConainer}>
        <ButtonMain 
          onPress={step === 0 ? handleContniue : handleSubmit} 
          title={"Sign Up"} 
        />
      </View>

      <Popup
        isOpen={modalVisible !== null}
        setIsOpen={setModalVisible}
        >
        {modalVisible === ResponseEnum.SUCCESS
        ?
          <>
          <CheckedAnimation />
          <ThemeText size='lg' weight='semibold'>Welcome aboard, {formData.firstName}</ThemeText>
          <ThemeText  style={styles.modalText}>Congrats, you successfully created your account. Now, let's login and jump right into action!</ThemeText>
          <ButtonMain onPress={handleLoginPress} title='Login' />
          </>
        :
          <>
          <ErrorAnimation width={120} height={120} />
          <ThemeText  style={styles.modalText}>Failed to create user. {errorMessage}</ThemeText>
          <ButtonMain onPress={() => setModalVisible(null)} title='Try Again' />
          </>
        }
      </Popup>

    </ThemeView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '12%',
  },

  animationContainer: {
    alignSelf: 'center',
    paddingVertical: '10%'
  },

  title: {
    paddingBottom: 15,
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center'
  },

  inputContainer: {
    paddingHorizontal: '4%'
  },

  inputsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15
  },

  input: {
    flex: 1
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

  backButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  arrow: {
    transform: [{ rotate: '90deg' }]
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Register;

