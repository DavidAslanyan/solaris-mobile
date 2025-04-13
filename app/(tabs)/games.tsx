import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import GameIcon from '@/components/icons/navbar-icons/GameIcon'
import { Colors } from '@/constants/Colors'
import { useAppTheme } from '../contexts/ThemeContext'
import ThemeText from '@/components/themes/theme-text'
import { GamesEnum } from '@/constants/game-titles'
import CoinIcon from '@/components/icons/CoinIcon'
import GameTab from '@/components/game-tab'


const GAMES = [
  {
    id: 1,
    title: "Classics - Quiz",
    gif: "/demos/game-1.mp4",
    image: require("@/assets/images/games/game-poster-1.png"),
    url: "games/quiz",
    name: GamesEnum.QUIZ
  },
  {
    id: 2,
    title: "Missing Word",
    gif: "/demos/game-1.mp4",
    image: require("@/assets/images/games/game-poster-1.png"),
    url: "games/missing-word",
    name: GamesEnum.MISSING_WORD
  },
  {
    id: 3,
    title: "Word Shuffle",
    gif: "/demos/game-1.mp4",
    image: require("@/assets/images/games/game-poster-1.png"),
    url: "games/word-shuffle",
    name: GamesEnum.WORD_SHUFFLE
  },
  {
    id: 4,
    title: "Feed the Monster",
    gif: "/demos/game-1.mp4",
    image: require("@/assets/images/games/game-poster-1.png"),
    url: "games/feed-monster",
    name: GamesEnum.FEED_MONSTER
  },
];

const Games = () => {
  const { theme } = useAppTheme();

  const user = {
    coins: 275,
    points: 300,
    gamesPassed: ["quiz"]
  }

  const requiredGames = [GamesEnum.QUIZ, GamesEnum.MISSING_WORD, GamesEnum.WORD_SHUFFLE, GamesEnum.FEED_MONSTER];
  const allGamesPassed = requiredGames.every(game => user.gamesPassed.includes(game));

  const [activeTab, setActiveTab] = useState<number | null>(null);

  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <ThemeText size='xl' weight='bold'>Games</ThemeText>
          <GameIcon color={theme === 'dark' ? Colors.white : Colors.secondary} />
        </View>
        <ThemeText size='lg' weight='semibold' style={{textAlign: 'center'}}>Practice Makes it Perfect</ThemeText>

        <View style={styles.userDataContainer}>
          <View style={styles.userData}>
            <ThemeText size='lg' weight='semibold'>XP <ThemeText size='lg'>Points:</ThemeText></ThemeText>
            <ThemeText size='lg' weight='bold'>{user.points}</ThemeText>
          </View>
          <View style={styles.userData}>
            <CoinIcon />
            <ThemeText size='lg'>Coins:</ThemeText>
            <ThemeText size='lg' weight='bold'>{user.points}</ThemeText>
          </View>
        </View>

        <ThemeText size='md' weight='medium' style={{textAlign: 'center', paddingVertical: '3%'}}>Complete all games to unclock new terms</ThemeText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.gamesList}>
            {GAMES.map((game, index) => (
              <View key={index} style={{ width: '100%', alignItems: 'center' }}>
                <GameTab
                  id={index}
                  completed={user.gamesPassed.includes(game.name)}
                  gif={game.gif}
                  url={game.url}
                  image={game.image}
                  title={game.title}
                  pressed={activeTab === index}
                  setPressed={setActiveTab}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: '4%',
    paddingBottom: '8%',
  },
  title: {
    paddingTop: '20%',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  userDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    gap: 5
  },
  gamesList: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 220
  }
})

export default Games