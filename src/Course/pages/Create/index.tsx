import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICourse from '../../domain/interfaces/ICourse';
import React, { useState, useEffect } from 'react';

export default function CourseCreate({ route, navigation }: any): JSX.Element {
  const [name, setName] = useState<string>('');
  const [studentLimit, setStudentLimit] = useState<string>('');

  const isEdit = Boolean(route.params?.course);

  useEffect(() => {
    if (isEdit) { 
      const { name, studentLimit } = route.params?.course;
      setName(name);
      setStudentLimit(studentLimit);
    }
  }, [isEdit]);

  async function handleSave(): Promise<void> {
    const course: ICourse = {
        name,
        studentLimit
    };

    try {
      const coursesCurrent = await AsyncStorage.getItem('courses');
      const courses: Array<ICourse> = coursesCurrent ? JSON.parse(coursesCurrent) : [];

      if (isEdit) {
        const { name: oldName } = route.params?.course;
        const courseSave = courses.map((c: ICourse) => (c.name === oldName ? course : c));
        
        await AsyncStorage.setItem('courses', JSON.stringify(courseSave));
      } else {
        courses.push(course);
        await AsyncStorage.setItem('courses', JSON.stringify(courses));
      }
      await navigation.navigate('Listagem de cursos', { courses });
    } catch (error) {
      console.log('Erro ao salvar o curso:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curso:</Text>
        <View style={styles.card}>
        <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Limite de estudantes"
            value={studentLimit}
            onChangeText={text => setStudentLimit(text)}
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