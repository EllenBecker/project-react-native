import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICourse from '../../domain/interfaces/ICourse';
import React, { useState, useEffect } from 'react';

export default function CourseList({ route, navigation }: any): JSX.Element {
  const [courses, setCourse] = useState<Array<ICourse>>([]);

  async function fetchCourse(): Promise<void> {
    try {
      const courseCurrent = await AsyncStorage.getItem('courses');
      const courses = courseCurrent ? JSON.parse(courseCurrent) : [];

      setCourse(courses);
    } catch (error) {
      console.log('Erro ao recuperar os cursos:', error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  function handleEditCourse(item: ICourse): void {
    navigation.navigate('Cadastro de curso', { course: item });
  };

  async function handleDeleteCourse(item: ICourse): Promise<void> {
    try {
      const courseCurrent = await AsyncStorage.getItem('courses');
      const courses: Array<ICourse> = courseCurrent ? JSON.parse(courseCurrent) : [];
      const coursesSave = courses.filter((c: ICourse) => c?.name !== item?.name);

      await AsyncStorage.setItem('courses', JSON.stringify(coursesSave));
      setCourse(courses);
      fetchCourse();
    } catch (error) {
      console.log('Erro ao excluir o curso:', error);
    }
  };

  function renderCourseItem({ item }: { item: ICourse }): JSX.Element {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.label}>Limite de estudantes:</Text>
        <Text style={styles.text}>{item.studentLimit}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEditCourse(item)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleteCourse(item)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos:</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
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
    backgroundColor: '#FFFFFF',
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
    color: '#333333',
  },
  text: {
    marginBottom: 10,
    color: '#666666',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});