import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import { Card, ListItem } from '../components';
import { COLORS, SIZES } from '../constants';
import { Lesson, Session, Student } from '../types';
import { api } from '../services/api';

interface LessonDetailScreenProps {
  navigation: any;
  route: any;
}

const LessonDetailScreen: React.FC<LessonDetailScreenProps> = ({ navigation, route }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { lesson, student } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: lesson.name });
    loadSessions();
  }, [lesson]);

  const loadSessions = async () => {
    try {
      const response = await api.getSessionsByLesson(lesson.id);
      if (response.success && response.data) {
        setSessions(response.data);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSessions();
    setRefreshing(false);
  };

  const handleSessionPress = (session: Session) => {
    navigation.navigate('SessionDetail', { session, student });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.lessonInfo}>
        <Text style={styles.lessonName}>{lesson.name}</Text>
        {lesson.description && (
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        )}
        {student && (
          <Text style={styles.studentInfo}>Student: {student.name} {student.surname}</Text>
        )}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Sessions</Text>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading sessions...</Text>
        ) : sessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No sessions available for this lesson</Text>
          </View>
        ) : (
          sessions.map((session) => (
            <ListItem
              key={session.id}
              title={session.topic}
              subtitle={`Date: ${formatDate(session.date)}`}
              onPress={() => handleSessionPress(session)}
            />
          ))
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  lessonInfo: {
    margin: SIZES.medium,
  },
  lessonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  lessonDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SIZES.small,
  },
  studentInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  section: {
    margin: SIZES.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  loadingText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    padding: SIZES.large,
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.extraLarge,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default LessonDetailScreen;
