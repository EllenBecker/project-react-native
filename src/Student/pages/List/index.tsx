import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IStudent from '../../domain/interfaces/IStudent';
import React, { useState, useEffect } from 'react';

export default function StudentList({ route, navigation }: any): JSX.Element {
  const [students, setStudent] = useState<Array<IStudent>>([]);
  
  async function fetchStudent(): Promise<void> {
      try {
        const studentsCurrent = await AsyncStorage.getItem('students');
        const students = studentsCurrent ? JSON.parse(studentsCurrent) : [];
  
        setStudent(students);
      } catch (error) {
        console.log('Erro ao recuperar os estudantes:', error);
      }
  };
  useEffect(() => {
    fetchStudent();
  }, []);

  function handleEditStudent(item: IStudent): void {
    navigation.navigate('Cadastro de estudante', { student: item });
  };

  async function handleDeleteStudent(item: IStudent): Promise<void> {
    try {
      const studentsCurrent = await AsyncStorage.getItem('students');
      const students: Array<IStudent> = studentsCurrent ? JSON.parse(studentsCurrent) : [];
      const studentsSave = students.filter((s: IStudent) => s?.name !== item?.name)

      await AsyncStorage.setItem('students', JSON.stringify(studentsSave));
      setStudent(students);
      fetchStudent();
    } catch (error) {
      console.log('Erro ao excluir o estudante:', error);
    }
  };

  function renderStudentItem({ item }: { item: IStudent }): JSX.Element {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.text}>{item.phone}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{item.email}</Text>
        <Text style={styles.label}>Documento:</Text>
        <Text style={styles.text}>{item.document}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEditStudent(item)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleteStudent(item)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudantes:</Text>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
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