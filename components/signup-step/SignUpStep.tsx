import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import { AVATARS, RENDER_AVATARS } from '@/constants/shop-items';
import { Colors } from '@/constants/Colors';
import ThemeText from '../themes/theme-text';

type SignUpStepProps = {
  avatar: string | null;
  setAvatar: (arg: string) => void;
  difficultyLevel: DifficultyLevel | null;
  setDifficultyLevel: (arg: DifficultyLevel) => void;
}

const SELECT_AVATARS = [
  {
    id: 1,
    title: "Male",
    url: RENDER_AVATARS.male1,
    urlStr: AVATARS.male1
  },
  {
    id: 2,
    title: "Female",
    url: RENDER_AVATARS.female1,
    urlStr: AVATARS.female1
  }
];

const SignUpStep: React.FC<SignUpStepProps> = ({
  avatar,
  setAvatar,
  difficultyLevel,
  setDifficultyLevel
}) => {
  const colorScheme = useColorScheme();
  const themeColor = colorScheme === 'light' ? Colors.lightBackground : Colors.darkBackground;

  return (
    <View>
      <View style={styles.section}>
        <ThemeText weight='semibold' size='md' style={styles.label}>Select Your Avatar</ThemeText>
        <View style={styles.avatarList}>
          {SELECT_AVATARS.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => setAvatar(item.urlStr)} style={styles.avatarItem}>
              <View
                style={[
                  styles.avatarBorder,
                  avatar === item.urlStr ? styles.selectedAvatar : styles.defaultAvatar,
                ]}
              >
                <Image source={item.url} style={styles.avatarImage} />
              </View>
              <ThemeText weight='semibold' style={styles.avatarText}>{item.title}</ThemeText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemeText size='md' weight='semibold' style={styles.label}>Select Your Difficulty Level</ThemeText>
        <View style={styles.difficultyContainer}>
          {Object.values(DifficultyLevel).map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setDifficultyLevel(level)}
              style={[
                styles.difficultyButton,
                difficultyLevel === level ? styles.selectedDifficulty : [styles.defaultDifficulty, { backgroundColor: themeColor }],
              ]}
            >
              {difficultyLevel === level
              ?
              <ThemeText 
              style={{color: Colors.white}}
              size='md' 
              weight='semibold'
              capitalize
              >{level}</ThemeText>
              :
              <ThemeText 
              size='md' 
              weight='semibold'
              capitalize
              >{level}</ThemeText>
              }
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.termsContainer}>
        <ThemeText style={styles.termsText}>
          By creating an account you agree to the terms of use and our{' '}
          <Text style={styles.link} onPress={() => console.log('Open Privacy Policy')}>
            privacy policy
          </Text>
        </ThemeText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    textAlign: 'center',
    marginBottom: 8,
  },
  avatarList: {
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center',
    gap: 16,
  },
  avatarItem: {
    alignItems: 'center',
  },
  avatarBorder: {
    borderWidth: 4,
    borderRadius: 9999,
    padding: 1,
  },
  selectedAvatar: {
    borderColor: Colors.primary,
  },
  defaultAvatar: {
    borderColor: Colors.thirdly,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  avatarText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.secondary,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 8,
  },
  difficultyButton: {
    flex: 1,
    maxWidth: 120,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  selectedDifficulty: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  defaultDifficulty: {
    borderColor: Colors.thirdly,
  },
  difficultyText: {
    color: Colors.secondary,
  },
  difficultyActiveText: {
    color: Colors.white,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: "1%",
  },
  termsText: {
    textAlign: 'center',
    paddingBottom: "5%"
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: Colors.primary
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default SignUpStep;

