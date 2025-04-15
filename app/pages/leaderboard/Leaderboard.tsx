import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ThemeText from '@/components/themes/theme-text';
import { ThemedView } from '@/components/ThemedView';
import GobletIcon from '@/components/icons/GobletIcon';
import { filterAvatar } from '@/utilities/functions/filter-avatars';
import UserRow from '@/components/user-row';
import ButtonBack from '@/components/buttons/button-back';

const dataMock = [
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/limited-5.png",
    frame: "red",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/limited-4.png",
    frame: "blue",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "orange",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "purple",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "hard",
    progress: 50
  },
  {
    firstName: "David",
    lastName: "Aslanyan",
    avatar: "/user-avatars/male-1.png",
    frame: "def",
    email: "david@gmail.com",
    points: 2000,
    difficulyLevel: "medium",
    progress: 50
  }
];

const formattedData = dataMock.map((item) => (
  {
    ...item,
    avatar: filterAvatar(item.avatar)
  }
));

const Leaderboard = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.backButton}>
        <ButtonBack text='Back' />
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <GobletIcon width={42} height={42} />
          <ThemeText size='xl' weight='bold'>Leaderboard</ThemeText>
          <GobletIcon width={42} height={42} />
        </View>

        <ThemeText size='md' weight='medium' style={{ textAlign: 'center', paddingVertical: 10 }}>
          This is where the best of the best shine! Check out the rankings, see how you stack up against other players!.
        </ThemeText>

        <View style={styles.listContainer}>
          <ScrollView  
            contentContainerStyle={{ paddingBottom: 40 }} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.list}>
              {formattedData.map((item, index) => (
                <UserRow data={item} id={index + 1} />
              ))}
            </View>
          </ScrollView>
        </View>
        
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backButton: {
    position: 'absolute',
    top: '6%',
    left: 10
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80
  },
  content: {
    flex: 1,
    paddingHorizontal: '4%'
  },
  listContainer: {
    flex: 1,
  },
  list: {
    gap: 10,
  }
})

export default Leaderboard;

