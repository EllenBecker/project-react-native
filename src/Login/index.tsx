import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }: any) {
    const goToCadastro = () => {
        navigation.navigate('Cadastro');
      };
      const goToCadastroCourse = () => {
        navigation.navigate('Cadastro de curso');
      };
      const goToCreateCountry = () => {
        navigation.navigate('Cadastro de países')
      };
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Tela de Login</Text>
          <Button title="Ir para Cadastro" onPress={goToCadastro} />
          <Button title="Ir para Cadastro de Curso" onPress={goToCadastroCourse} />
          <Button title="Ir para Cadastro de Países" onPress={goToCreateCountry} />
        </View>
      );
}