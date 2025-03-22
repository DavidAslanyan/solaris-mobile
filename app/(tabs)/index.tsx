import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/themes/theme-text';
import AnimatedHeader from '@/components/animated-header/AnimatedHeader';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
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
    <GestureHandlerRootView>
      <View style={styles.container}>
        <AnimatedHeader
          inputText={inputText}
          setInputText={setInputText}
          handleTextChange={handleTextChange}
          handleSearchSubmit={handleSearchSubmit}
          >

        <Link href="/register">
          <ThemeText>Register</ThemeText>
        </Link>
        <Link href="/login"><ThemeText>Login</ThemeText></Link>
        <View style={styles.block}></View>

      </AnimatedHeader>
      </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    
  },
  block: {
    height: 1500,
    width: 120,
    backgroundColor: 'pink'
  }
});