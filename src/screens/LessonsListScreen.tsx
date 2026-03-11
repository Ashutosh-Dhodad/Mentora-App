import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import { Card, ListItem, Button } from '../components';
import { COLORS, SIZES } from '../constants';
import { Lesson, Student } from '../types';
import { api } from '../services/api';

interface LessonsListScreenProps {
  navigation: any;
  route: any;
}

const LessonsListScreen: React.FC<LessonsListScreenProps> = ({ navigation, route }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const student = route.params?.student;

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      const response = await api.getLessons();
      if (response.success && response.data) {
        setLessons(response.data);
      }
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLessons();
    setRefreshing(false);
  };

  const handleLessonPress = (lesson: Lesson) => {
    navigation.navigate('LessonDetail', { lesson, student });
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>📚</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lessons</Text>
            {student && (
              <Text style={styles.subtitle}>For: {student.name} {student.surname}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Stats Card */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{lessons.length}</Text>
          <Text style={styles.statLabel}>Available Lessons</Text>
        </Card>
      </View>

      {/* Lessons Section */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>All Lessons</Text>
            <Text style={styles.sectionSubtitle}>Browse available lessons</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading lessons...</Text>
          </View>
        ) : lessons.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>📖</Text>
            </View>
            <Text style={styles.emptyText}>No lessons available</Text>
            <Text style={styles.emptySubtext}>Check back later for new lessons</Text>
          </View>
        ) : (
          <View style={styles.lessonsList}>
            {lessons.map((lesson) => (
              <ListItem
                key={lesson.id}
                title={lesson.name}
                subtitle={lesson.description}
                onPress={() => handleLessonPress(lesson)}
                style={styles.lessonItem}
              />
            ))}
          </View>
        )}
      </Card>

      {/* Quick Actions */}
      {!student && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSubtitle}>Common tasks</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <Button
              title="Refresh Lessons"
              onPress={onRefresh}
              style={styles.actionButton}
              variant="secondary"
            />
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: SIZES.extraLarge,
  },
  header: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.extraLarge,
    borderBottomLeftRadius: SIZES.extraLarge,
    borderBottomRightRadius: SIZES.extraLarge,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SIZES.medium,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.card,
    marginBottom: SIZES.small / 2,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.card,
    opacity: 0.9,
  },
  statsContainer: {
    paddingHorizontal: SIZES.medium,
    marginTop: SIZES.large,
  },
  statCard: {
    padding: SIZES.medium,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SIZES.small / 2,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    margin: SIZES.medium,
    marginTop: SIZES.large,
    padding: SIZES.large,
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: SIZES.large,
  },
  sectionTitleContainer: {
    marginBottom: SIZES.medium,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.small / 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: SIZES.large,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.extraLarge,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  lessonsList: {
    gap: SIZES.small,
  },
  lessonItem: {
    marginBottom: SIZES.small,
  },
  actionsContainer: {
    gap: SIZES.medium,
  },
  actionButton: {
    marginTop: SIZES.small,
  },
});

export default LessonsListScreen;
