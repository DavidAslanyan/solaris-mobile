import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/themes/theme-text';
import AnimatedHeader from '@/components/animated-header/AnimatedHeader';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DashboardContainer from '@/components/dashboard-container';
import CoinIcon from '@/components/icons/CoinIcon';
import ProgressIcon from '@/components/icons/ProgressIcon';
import { determinePrize } from '@/utilities/functions/map-prizes';
import { fetchTermsLevelBased } from '@/utilities/functions/fetch-terms-level-based';
import { PROGRESS_POINTS } from '@/constants/global-data';
import { DifficultyLevel } from '@/utilities/enums/difficulty-level.enum';
import { ThemedView } from '@/components/ThemedView';
import ButtonStudy from '@/components/buttons/button-study';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import LevelMap from '@/components/level-map/LevelMap';
import Search from '../search';
import History from '../history';


export default function HomeScreen() {
  const userMappedData = {
    username: "David Aslanyan",
    progress: 5, 
    points: 24000,
    coins: 1200,
    difficultyLevel: 'easy'
  }

  const { current, next } = determinePrize(userMappedData?.points);
  const curProgress = userMappedData?.progress;
  const curCoins = userMappedData?.coins;
  const curPoints = userMappedData?.points;
  const progressForMap = userMappedData?.progress * 5;
  const termsLevelBased = fetchTermsLevelBased(DifficultyLevel.EASY); 
  const termData = termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS);

  const user = true;
  const [inputText, setInputText] = useState<string>("");
  
  const handleTextChange = (newText: string) => {
    setInputText(newText); 
  };

  const handleSearchSubmit = () => {
   
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <History />
    // <GestureHandlerRootView>
    //   <ThemedView style={styles.container}>
    //   <AnimatedHeader
    //     inputText={inputText}
    //     setInputText={setInputText}
    //     handleTextChange={handleTextChange}
    //     handleSearchSubmit={handleSearchSubmit}
    //     >
    //     <View style={styles.content}>
    //       <DashboardContainer>
    //         <View style={styles.welcomeBox}>
    //           <View style={styles.leftBlock}>
    //             <ThemeText size='2xl' weight='bold'>Hi, {userMappedData.username}</ThemeText>
    //             <ThemeText size='md' weight='bold'>XP: {userMappedData.points}</ThemeText>
    //             <View style={styles.dataBlock}>
    //               <CoinIcon />
    //               <ThemeText size='md'>Coins: <ThemeText size='lg' weight='bold'>{curCoins}</ThemeText></ThemeText>
    //             </View>
    //             <View style={styles.dataBlock}>
    //               <ProgressIcon />
    //               <ThemeText size='md'>Progress: <ThemeText size='lg' weight='bold'>{curProgress}</ThemeText></ThemeText>
    //             </View>
    //           </View>

    //           <View style={styles.rightBlock}>
    //             {current.icon}
    //             <ThemeText size='lg' weight='bold' style={styles.rang}>{current.title}</ThemeText>
    //           </View>
    //         </View>
    //       </DashboardContainer>

    //       <View style={styles.progressBaContainer}>
    //         <View style={styles.progressLeft}>
    //           <ThemeText weight='semibold'>Keep going to earn your next prize!</ThemeText>
    //           <ProgressBar maxWidth={290} progress={curPoints} limit={next.points} />
    //           <ThemeText weight='semibold'>{curPoints} / {next.points} points</ThemeText>
    //         </View>

    //         <View style={styles.progressRight}>
    //           <ThemeText weight='semibold'>Next Prize</ThemeText>
    //           {next.icon}
    //           <ThemeText weight='bold' style={styles.rang}>{next.title}</ThemeText>
    //         </View>
    //       </View>

    //       <DashboardContainer>
    //         <View style={styles.termsBox}>
    //           <View>
    //             <ThemeText size='xl' weight='bold'>Your Next Terms to Learn</ThemeText>
    //             {termData[0]?.term 
    //             ? 
    //             <View style={styles.termsList}>
    //               <ThemeText size='md'>1. {termData[0]?.term}</ThemeText>
    //               <ThemeText size='md'>2. {termData[1]?.term}</ThemeText>
    //               <ThemeText size='md'>3. {termData[2]?.term}</ThemeText>
    //               <ThemeText size='md'>4. {termData[3]?.term}</ThemeText>
    //               <ThemeText size='md'>and more...</ThemeText>
    //             </View>
    //             : 
    //             <ThemeText>All terms completed</ThemeText>
    //             }
    //           </View>

    //           <View style={styles.triangleButton}>
    //             <ButtonStudy url='' size='medium' title='Study' />
    //           </View>
    //         </View>
    //       </DashboardContainer>

    //       <View style={styles.mapTitle}>
    //         <ThemeText weight='bold' size='md'>See Your Journey</ThemeText>
    //       </View>
    
    //       <LevelMap progress={progressForMap  ?? 0} />

    //       <Link href="/register">
    //         <ThemeText>Register</ThemeText>
    //       </Link>
    //       <Link href="/login"><ThemeText>Login</ThemeText></Link>
    //       <View style={styles.block}></View>
    //     </View>

    //   </AnimatedHeader>
    //   </ThemedView>
    // </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  block: {
    width: 120,
  },

  content: {
    paddingTop: '20%',
    width: '100%',
    paddingHorizontal: '4%'
  },

  welcomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    paddingTop: '8%',
    paddingHorizontal: '4%'
  },

  dataBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  leftBlock: {
    gap: 10
  },

  rightBlock: {
    alignItems: 'center',
  },

  rang: {
    textAlign: 'center',
    color: Colors.primary,
    width: "70%"
  },

  termsList: {
    paddingTop: '5%',
    gap: 5
  },

  triangleButton: {
    position: 'relative',
    right: 50
  },

  progressBaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '6%'
  },

  progressRight: {
    alignItems: 'center',
    width: '26%'
  },

  progressLeft: {
    gap: 10
  },

  termsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    paddingTop: '8%',
    paddingHorizontal: '4%'
  },

  mapTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: '5%'
  }
});