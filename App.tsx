import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from './src/Navigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
