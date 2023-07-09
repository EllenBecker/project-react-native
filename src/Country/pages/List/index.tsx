import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICountry from '../../domain/interfaces/ICountry';
import React, { useState, useEffect } from 'react';

export default function CountryList({ route, navigation }: any): JSX.Element {
  const [countries, setCountries] = useState<Array<ICountry>>([]);
  
  async function fetchCountry():Promise<void> {
    try {
      const countryCurrent = await AsyncStorage.getItem('countries');
      const countries = countryCurrent ? JSON.parse(countryCurrent) : [];

      setCountries(countries);
    } catch (error) {
      console.log('Erro ao recuperar os paises:', error);
    }
  };
  useEffect(() => {
    fetchCountry();
  }, []);

  function handleEditCountry(item: ICountry): void {
    navigation.navigate('Cadastro de país', { country: item });
  };

  async function handleDeleteCountry(item: ICountry): Promise<void> {
    try {
      const countryCurrent = await AsyncStorage.getItem('countries');
      const countries: Array<ICountry> = countryCurrent ? JSON.parse(countryCurrent) : [];
      const countriesSave = countries.filter((c: ICountry) => c?.name !== item?.name);

      await AsyncStorage.setItem('countries', JSON.stringify(countriesSave));
      setCountries(countries);
      fetchCountry();
    } catch (error) {
      console.log('Erro ao excluir o país:', error);
    }
  };

  function renderCountryItem({ item }: { item: ICountry }): JSX.Element {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.label}>Sigla:</Text>
        <Text style={styles.text}>{item.acronym}</Text>
        <Text style={styles.label}>Quantidade populacional:</Text>
        <Text style={styles.text}>{item.qtdPopulation}</Text>
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Países:</Text>
      <FlatList
        data={countries}
        renderItem={renderCountryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardList: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    marginBottom: 10,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});