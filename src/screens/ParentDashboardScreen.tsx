import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import { Card, ListItem, Button } from '../components';
import { COLORS, SIZES } from '../constants';
import { Student, User } from '../types';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface ParentDashboardScreenProps {
  navigation: any;
  route: any;
  user?: User;
  onLogout?: () => void;
}

const ParentDashboardScreen: React.FC<ParentDashboardScreenProps> = ({ navigation, route, user }) => {
  const { logout } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Get user from prop or use fallback
  const currentUser: User = user || route.params?.user || {
    userId: 'parent1',
    name: "Jane's Parent",
    role: 'parent',
    email: 'parent@example.com',
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStudents();
    });

    return unsubscribe;
  }, [navigation]);

  const loadStudents = async () => {
    try {
      const response = await api.getStudentsByParent(currentUser.userId);
      if (response.success && response.data) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudents();
    setRefreshing(false);
  };

  const handleCreateStudent = () => {
    navigation.navigate('CreateStudent');
  };

  const handleStudentPress = (student: Student) => {
    navigation.navigate('LessonsList', { student });
  };

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();
  };

  const calculateAge = (dateOfBirth: string): string => {
    // Handle different date formats by replacing separators
    const normalizedDate = dateOfBirth.replace(/[\/\\-]/g, '-');
    const birth = new Date(normalizedDate);
    
    // Check if date is valid
    if (isNaN(birth.getTime())) {
      return 'Age unknown';
    }
    
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years old`;
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
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{currentUser.name}</Text>
            <Text style={styles.userRole}>Parent Dashboard</Text>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            style={styles.logoutButton}
            textStyle={{ color: COLORS.card }}
          />
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{students.length}</Text>
          <Text style={styles.statLabel}>Total Students</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Active Lessons</Text>
        </Card>
      </View>

      {/* Students Section */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>My Students</Text>
            <Text style={styles.sectionSubtitle}>Manage your students</Text>
          </View>
          <Button
            title="Add Student"
            onPress={handleCreateStudent}
            variant="secondary"
            style={styles.addButton}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading students...</Text>
          </View>
        ) : students.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>📚</Text>
            </View>
            <Text style={styles.emptyText}>No students found</Text>
            <Text style={styles.emptySubtext}>Add your first student to get started</Text>
            <Button
              title="Create Student"
              onPress={handleCreateStudent}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <View style={styles.studentsList}>
            {students.map((student) => (
              <ListItem
                key={student.id}
                title={`${student.name} ${student.surname}`}
                subtitle={calculateAge(student.dateOfBirth)}
                onPress={() => handleStudentPress(student)}
                style={styles.studentItem}
              />
            ))}
          </View>
        )}
      </Card>

      {/* Quick Actions Section */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <Text style={styles.sectionSubtitle}>Common tasks</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <Button
            title="View All Lessons"
            onPress={() => navigation.navigate('LessonsList')}
            style={styles.actionButton}
          />
        </View>
      </Card>
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
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.extraLarge,
    borderBottomLeftRadius: SIZES.extraLarge,
    borderBottomRightRadius: SIZES.extraLarge,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  welcomeContainer: {
    flex: 1,
    paddingVertical: SIZES.medium,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.card,
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.card,
    marginBottom: SIZES.small / 2,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.card,
    opacity: 0.8,
  },
  logoutContainer: {
    position: 'absolute',
    top: SIZES.large,
    right: SIZES.large,
    paddingVertical: SIZES.medium,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: COLORS.card,
    backgroundColor: 'transparent',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.medium,
    marginTop: SIZES.large,
    gap: SIZES.medium,
  },
  statCard: {
    flex: 1,
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
    color: COLORS.primary,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.large,
  },
  sectionTitleContainer: {
    flex: 1,
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
  addButton: {
    marginLeft: SIZES.medium,
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
    marginBottom: SIZES.large,
    lineHeight: 20,
  },
  emptyButton: {
    marginTop: SIZES.small,
  },
  studentsList: {
    gap: SIZES.small,
  },
  studentItem: {
    marginBottom: SIZES.small,
  },
  actionsContainer: {
    gap: SIZES.medium,
  },
  actionButton: {
    marginTop: SIZES.small,
  },
});

export default ParentDashboardScreen;
