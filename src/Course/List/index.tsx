import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CourseList = ({ route, navigation }: any) => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Tela anterior foi focada');
      fetchCourse();
    });

    const fetchCourse = async () => {
      try {
        const courseBefore = await AsyncStorage.getItem('courses');
        const courses = courseBefore ? JSON.parse(courseBefore) : [];
  
        setCourse(courses);
      } catch (error) {
        console.log('Erro ao recuperar os cursos:', error);
      }
    };
    fetchCourse();
  }, []);

  const handleEditCourse = (item: any) => {
    navigation.navigate('Cadastro de curso', { course: item });
  };

  const handleDeleteCourse = async (item: any) => {
    try {
      const courseBefore = await AsyncStorage.getItem('courses');
      let courses = courseBefore ? JSON.parse(courseBefore) : [];

      courses = courses.filter((p: any) => p?.nome !== item?.nome);

      await AsyncStorage.setItem('courses', JSON.stringify(courses));

      setCourse(courses);
    } catch (error) {
      console.log('Erro ao excluir o curso:', error);
    }
  };

  const renderCourseItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.text}>{item?.nome}</Text>
      <Text style={styles.label}>Limite de alunos:</Text>
      <Text style={styles.text}>{item?.studentLimit}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de cursos cadastrados:</Text>
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

export default CourseList;