import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import React from 'react'
import { selectFrameColor } from '@/utilities/functions/select-frame-color'
import ThemeText from '../themes/theme-text'
import { useAppTheme } from '@/app/contexts/ThemeContext'
import { Colors } from '@/constants/Colors'

type UserTableRowItem = {
  firstName: string,
  lastName: string,
  avatar: ImageSourcePropType,
  frame: string,
  points: number,
  progress: number
}

type UserTableRowProps = {
  data: UserTableRowItem;
  id: number
}

const UserRow : React.FC<UserTableRowProps> = ({ data, id }) => {
  const {
    firstName,
    lastName,
    avatar,
    frame,
    points,
    progress
  } = data;

  const { theme } = useAppTheme();
  const borderColor = theme === 'dark' ? Colors.darkThirdly : Colors.secondary;

  return (
    <View style={[styles.container, {
      borderColor: borderColor
    }]}>
      <View style={styles.imageContainer}>
        <ThemeText size='md' weight='medium'>{id}</ThemeText>
        <View style={{
          borderWidth: 2,
          width: 45,
          height: 45,
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: selectFrameColor(frame)
        }}>
          <Image style={styles.image} source={avatar} />
        </View>
      </View>
      <ThemeText>{firstName} {lastName}</ThemeText>

      <View>
        <ThemeText>Points: <ThemeText weight='bold' style={{color: Colors.primary}}>{points}</ThemeText></ThemeText>
        <ThemeText>Progress: <ThemeText weight='bold' style={{color: Colors.primary}}>{progress} </ThemeText></ThemeText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: '4%',
    paddingVertical: 6
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  image: {
    width: 42,
    height: 42
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})

export default UserRow;

