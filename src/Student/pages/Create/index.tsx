import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IStudent from '../../domain/interfaces/IStudent';
import React, { useState, useEffect } from 'react';

export default function StudentCreate({ route, navigation }: any): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [document, setDocument] = useState<string>('');

  const isEdit = Boolean(route.params?.student);

  useEffect(() => {
    if (isEdit) {
      const { name, email, phone, document } = route.params?.student;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setDocument(document);
    }
  }, [isEdit]);

  async function handleSave(): Promise<void> {
    const student: IStudent = {
      name,
      email,
      phone,
      document,
    };

    try {
      const studentsCurrent = await AsyncStorage.getItem('students');
      const students: Array<IStudent> = studentsCurrent ? JSON.parse(studentsCurrent) : [];
      
      if (isEdit) {
        const { name: oldName } = route.params?.student;
        const studentSave = students.map((s: IStudent) => (s.name === oldName ? student : s));
        
        await AsyncStorage.setItem('students', JSON.stringify(studentSave));
      } else {
        students.push(student);
        await AsyncStorage.setItem('students', JSON.stringify(students));
      }
      await navigation.navigate('Listagem de estudantes', { students });
    } catch (error) {
      console.log('Erro ao salvar estudante:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudante:</Text>
        <View style={styles.card}>
        <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Telefone"
            value={phone}
            onChangeText={text => setPhone(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Documento"
            value={document}
            onChangeText={text => setDocument(text)}
            style={styles.input}
        />
        <Button title="Cadastrar" onPress={handleSave} />
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