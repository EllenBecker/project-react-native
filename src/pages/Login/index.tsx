import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }: any) {
    const goToCadastro = () => {
        navigation.navigate('Cadastro');
      };
    
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Tela de Login</Text>
          <Button title="Ir para Cadastro" onPress={goToCadastro} />
        </View>
      );
}