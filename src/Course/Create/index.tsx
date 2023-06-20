import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: any,
  navigation: any
}

export default function CreateCourse({ route, navigation }: Props) {
  const [nome, setNome] = useState('');
  const [studentLimit, setStudentLimit] = useState('');

  const isEdicao = route.params && route.params.course;

  useEffect(() => {
    if (isEdicao) {
      const { nome, studentLimit } = route.params.course;
      setNome(nome);
      setStudentLimit(studentLimit);
    }
  }, [isEdicao]);

  const handleCreate = async () => {
    const course = {
        nome,
        studentLimit
    };

    try {
      const courseBefore = await AsyncStorage.getItem('courses');
      let courses = courseBefore ? JSON.parse(courseBefore) : [];

      if (isEdicao) {
        const { nome: oldNome } = route.params.course;
        courses = courses.map((p: any) => (p.nome === oldNome ? course : p));
      } else {
        courses.push(course);
      }

      await AsyncStorage.setItem('courses', JSON.stringify(courses)).then((result) => {
        navigation.navigate('Listagem de cursos',{ courses: courses });
      });
    } catch (error) {
      console.log('Erro ao salvar o curso:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de cadastro de curso</Text>
        <View style={styles.card}>
        <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Limite de alunos"
            value={studentLimit}
            onChangeText={text => setStudentLimit(text)}
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