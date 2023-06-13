import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListagemScreen = () => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
        const pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];

        setPessoas(pessoas);
      } catch (error) {
        console.log('Erro ao recuperar as pessoas:', error);
      }
    };

    fetchPessoas();
  }, []);

  const renderPessoaItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.text}>{item?.nome}</Text>
      <Text style={styles.label}>Celular:</Text>
      <Text style={styles.text}>{item?.celular}</Text>
      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.text}>{item?.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pessoas Cadastradas:</Text>
      <FlatList
        data={pessoas}
        renderItem={renderPessoaItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

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
  cardList: {
    width: '100%',
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
    marginBottom: 10,
    width: width - 32,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
});

export default ListagemScreen;