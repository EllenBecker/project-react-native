import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentCreate from './Student/pages/Create';
import CountryCreate from './Country/pages/Create';
import CourseCreate from './Course/pages/Create';
import CountryList from './Country/pages/List';
import StudentList from './Student/pages/List';
import CourseList from './Course/pages/List';
import Home from './Home';
import React from 'react';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro de estudante" component={StudentCreate} />
        <Stack.Screen name="Listagem de estudantes" component={StudentList} />
        <Stack.Screen name="Cadastro de curso" component={CourseCreate} />
        <Stack.Screen name="Listagem de cursos" component={CourseList} />
        <Stack.Screen name="Cadastro de país" component={CountryCreate} />
        <Stack.Screen name="Listagem de países" component={CountryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}