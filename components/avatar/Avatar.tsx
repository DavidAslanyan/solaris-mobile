import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { selectFrameColor } from '@/utilities/functions/select-frame-color'
import useGetUser from '@/utilities/hooks/useGetUser';
import { filterAvatar } from '@/utilities/functions/filter-avatars';
import Loader from '../loader';

const Avatar = () => {
  const { user, isLoading } = useGetUser();
  
  const data = {
    avatarUrl: user?.avatar && filterAvatar(user?.avatar),
    frame: user?.frame
  }

  if (isLoading) return <Loader />;

  return (
    <View style={[styles.frame, { borderColor: selectFrameColor(data.frame) } ]}>
      <Image style={styles.avatar} source={data.avatarUrl} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 2,
    borderRadius: 120
  },

  avatar: {
    width: 30,
    height: 30
  }
})

export default Avatar;

