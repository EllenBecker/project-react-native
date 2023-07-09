import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICountry from '../../domain/interfaces/ICountry';
import React, { useState, useEffect } from 'react';

export default function CountryCreate({ route, navigation }: any): JSX.Element {
  const [name, setName] = useState<string>('');
  const [acronym, setAcronym] = useState<string>('');
  const [qtdPopulation, setQtdPopulation] = useState<string>('');

  const isEdit = Boolean(route.params?.country);

  useEffect(() => {
    if (isEdit) {
      const { name, acronym, qtdPopulation } = route.params?.country;
      setName(name);
      setAcronym(acronym);
      setQtdPopulation(qtdPopulation);
    }
  }, [isEdit]);

  async function handleSave(): Promise<void> {
    const country: ICountry = {
      name,
      acronym,
      qtdPopulation
    };

    try {
      const countriesCurrent = await AsyncStorage.getItem('countries');
      const countries: Array<ICountry> = countriesCurrent ? JSON.parse(countriesCurrent) : [];

      if (isEdit) {
        const { name: oldName } = route.params?.country;
        const countrySave = countries.map((c: ICountry) => (c.name === oldName ? countries : c));

        await AsyncStorage.setItem('countries', JSON.stringify(countrySave));
      } else {
        countries.push(country);
        await AsyncStorage.setItem('countries', JSON.stringify(countries));
      }
      await navigation.navigate('Listagem de países', { countries });
    } catch (error) {
      console.log('Erro ao salvar o pais:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>País:</Text>
        <View style={styles.card}>
        <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Sigla"
        value={acronym}
        onChangeText={text => setAcronym(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade populacional"
        value={qtdPopulation}
        onChangeText={text => setQtdPopulation(text)}
        style={styles.input}
      />
      <Button
        title="Cadastrar"
        onPress={handleSave}
      />
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '90%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});