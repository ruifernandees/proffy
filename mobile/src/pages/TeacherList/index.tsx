import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

const TeacherList = () => {

  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const teachersFavorites = JSON.parse(response);
        const teachersIdsFavorites = teachersFavorites.map((teacher: Teacher) => {
          return teacher.id;
        });
        setFavorites(teachersIdsFavorites);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const week_days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado"
    ];

    const week_day_number = week_days.indexOf(week_day);

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: week_day_number,
        time
      }
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={24} color="#FFF" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput 
            style={styles.input}
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholder="Qual a matéria?"
            placeholderTextColor="#c1bccc"
          />

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <TextInput 
                style={styles.input}
                value={week_day}
                onChangeText={text => setWeekDay(text)}
                placeholder="Qual o dia?"
                placeholderTextColor="#c1bccc"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput 
                style={styles.input}
                value={time}
                onChangeText={text => setTime(text)}
                placeholder="Qual horário?"
                placeholderTextColor="#c1bccc"
              />
            </View>
          </View>

          <RectButton 
            style={styles.submitButton}
            onPress={handleFiltersSubmit}
          >
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        </View>
      }
      </PageHeader>
      
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
        {
          (teachers.length === 0)
          ? 
          <Text style={styles.messageFilter}>Filtre para encontrar proffys</Text> 
          :
          teachers.map((teacher: Teacher) => (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher} 
              isFavorite={favorites.includes(teacher.id)}
            />
          ))
        }
      </ScrollView>
    </View>
  );
};

export default TeacherList;