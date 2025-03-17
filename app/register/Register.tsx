import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputCustom from '@/components/input-custom/InputCustom';
import EmailIcon from '@/components/icons/EmailIcon';
import LockIcon from '@/components/icons/LockIcon';
import ButtonMain from '@/components/buttons/button-main';
import RegisterHeroAnimation from '@/components/lottie-animations/lottie-register-hero';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: "",
  });

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  return (
    <View style={styles.container}>
      <RegisterHeroAnimation />
      <Text>Become a member of out great community</Text>

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
          icon={<EmailIcon color='black' />}
          placeholder="example@gmail.com"
        />

        <InputCustom
            isPassword={true}
            onChange={(text) => handleFormChange('password', text)}
            value={formData.password}
            label="Password"
            icon={<LockIcon color={'black'} />}
          />

          <InputCustom
            isPassword={true}
            onChange={(text) => handleFormChange('rPassword', text)}
            value={formData.rPassword}
            label="Confirm Password"
            icon={<LockIcon color={'black'} />}
          />
      </View>

      <ButtonMain title='Sign Up' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
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
  }
});

export default Register;

