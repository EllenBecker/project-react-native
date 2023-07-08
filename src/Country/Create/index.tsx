import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: any,
  navigation: any
}

export default function CountryCreate({ route, navigation }: Props) {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [qtdPopulation, setQtdPopulation] = useState('');
console.log(route.params)
  const isEdicao = route.params && route.params?.country;

  useEffect(() => {
    if (isEdicao) {
      const { name, acronym, qtdPopulation } = route.params?.country;
      setName(name);
      setAcronym(acronym);
      setQtdPopulation(qtdPopulation);
    }
  }, [isEdicao]);

  const handleSave = async () => {
    const country = {
      name: name,
      acronym: acronym,
      qtdPopulation: qtdPopulation
    };
    try {
      const countryBefore = await AsyncStorage.getItem('countries');
      let countries = countryBefore ? JSON.parse(countryBefore) : [];

      if (isEdicao) {
        const { name: oldName } = route.params.country;
        countries = countries.map((p: any) => (p.name === oldName ? country : p));
      } else {
        countries.push(country);
      }

      await AsyncStorage.setItem('countries', JSON.stringify(countries)).then((result) => {
        navigation.navigate('Listagem de países',{ countries: countries });
      });
    } catch (error) {
      console.log('Erro ao salvar o pais:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de cadastro de países</Text>
        <View style={styles.card}>
        <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Sigla"
        value={acronym}
        onChangeText={(text) => setAcronym(text)}
      />
      <TextInput
        placeholder="População"
        value={qtdPopulation}
        onChangeText={(text) => setQtdPopulation(text)}
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