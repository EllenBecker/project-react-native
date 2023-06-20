import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: any,
  navigation: any
}

export default function StudentCreate({ route, navigation}: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [document, setDocument] = useState('');

  const isEdicao = route.params && route.params.pessoa;

  useEffect(() => {
    if (isEdicao) {
      const { nome, email, celular,document } = route.params.pessoa;
      setNome(nome);
      setEmail(email);
      setCelular(celular);
      setDocument(document);
    }
  }, [isEdicao]);

  const handleCreate = async () => {
    const pessoa = {
        nome,
        email,
        celular,
        document
    };

    try {
      const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
      let pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];

      if (isEdicao) {
        const { nome: oldNome } = route.params.pessoa;
        pessoas = pessoas.map((p: any) => (p.nome === oldNome ? pessoa : p));
      } else {
        pessoas.push(pessoa);
      }

      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas)).then((result) => {
        navigation.navigate('Listagem',{ pessoas: pessoas });
      });
    } catch (error) {
      console.log('Erro ao salvar estudante:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Create</Text>
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
        <TextInput
            placeholder="Documento"
            value={document}
            onChangeText={text => setDocument(text)}
            style={styles.input}
        />
        <Button title="Cadastrar" onPress={handleCreate} />
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