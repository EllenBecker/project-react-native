import { Button, Text, TextInput, View, StyleSheet  } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: any
}

export default function Cadastro({navigation}: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const handleCadastro = async () => {
    const pessoa = {
        nome,
        email,
        celular,
    };

    try {
      const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
      const pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];

      pessoas.push(pessoa);
      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas));

      navigation.navigate('Listagem', { pessoa });
    } catch (error) {
      console.log('Erro ao salvar a pessoa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>
        <View style={styles.card}>
        <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Celular"
            value={celular}
            onChangeText={text => setCelular(text)}
            style={styles.input}
        />
        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      width: '100%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 10,
      padding: 5,
    },
  });