import { StyleSheet, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

export default function HomeScreen() {
  const user = false;
  if (!user) {
    return <Redirect href="/register" />;
  }

  return (
    <View style={styles.container}>
      <Link href="/register">About</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 120, 
  },
});