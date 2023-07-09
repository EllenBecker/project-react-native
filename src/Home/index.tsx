import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Home({ navigation }: any): JSX.Element {
  function goToCreateStudent(): void {
    navigation.navigate('Cadastro de estudante');
  };
  function goToCreateCourse(): void {
    navigation.navigate('Cadastro de curso');
  };
  function goToCreateCountry(): void {
    navigation.navigate('Cadastro de país');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToCreateStudent}>
        <Text style={styles.buttonText}>Cadastro de estudante</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToCreateCourse}>
        <Text style={styles.buttonText}>Cadastro de Curso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToCreateCountry}>
        <Text style={styles.buttonText}>Cadastro de país</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});