import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CountryList({ route, navigation }: any) {
  const [countries, setCountries] = useState([]);
console.log(navigation)
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const countryBefore = await AsyncStorage.getItem('countries');
        const countries = countryBefore ? JSON.parse(countryBefore) : [];
  
        setCountries(countries);
      } catch (error) {
        console.log('Erro ao recuperar os paises:', error);
      }
    };
    fetchCountry();
  }, []);

  const handleEditCountry = (item: any) => {
    navigation.navigate('Cadastro de países', { country: item });
  };

  const handleDeleteCountry = async (item: any) => {
    try {
      const countryBefore = await AsyncStorage.getItem('countries');
      let countries = countryBefore ? JSON.parse(countryBefore) : [];

      countries = countries.filter((p: any) => p?.name !== item?.name);

      await AsyncStorage.setItem('countries', JSON.stringify(countries));

      setCountries(countries);
    } catch (error) {
      console.log('Erro ao excluir o paíse:', error);
    }
  };

  const renderCountryItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text>Nome: {item.name}</Text>
      <Text>Sigla: {item.acronym}</Text>
      <Text>População: {item.qtdPopulation}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditCountry(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteCountry(item)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de cursos cadastrados:</Text>
      <FlatList
        data={countries}
        renderItem={renderCountryItem}
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
