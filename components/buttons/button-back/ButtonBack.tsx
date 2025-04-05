import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ArrowIcon from '@/components/icons/ArrowIcon';
import ThemeText from '@/components/themes/theme-text';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

type ButtonBackProps = {
  text?: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({
  text = ""
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  }

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.button}>
      <View style={styles.arrow}>
        <ArrowIcon width={32} height={32} />
      </View>
      <ThemeText size='lg' weight='semibold'>{text}</ThemeText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '10%'
  },
  arrow: {
    transform: [{ rotate: '90deg' }]
  }
})

export default ButtonBack;
