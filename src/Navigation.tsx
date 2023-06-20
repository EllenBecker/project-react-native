import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './Login';
import StudentCreate from './Student/Create';
import StudentList from './Student/List';
import CourseCreate from './Course/Create';
import CourseList from './Course/List';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={StudentCreate} />
        <Stack.Screen name="Listagem" component={StudentList} />
        <Stack.Screen name="Cadastro de curso" component={CourseCreate} />
        <Stack.Screen name="Listagem de cursos" component={CourseList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}