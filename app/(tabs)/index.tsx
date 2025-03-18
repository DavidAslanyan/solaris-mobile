import { StyleSheet, View } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/themes/theme-text';

export default function HomeScreen() {
  const user = true;
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Link href="/register">
        <ThemeText>Register</ThemeText>
      </Link>
      <Link href="/login"><ThemeText>Login</ThemeText></Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 120, 
  },
});