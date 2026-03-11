import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import { Card, ListItem, Button } from '../components';
import { COLORS, SIZES } from '../constants';
import { Student, User } from '../types';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface MentorDashboardScreenProps {
  navigation: any;
  route: any;
  user?: User;
  onLogout?: () => void;
}

const MentorDashboardScreen: React.FC<MentorDashboardScreenProps> = ({ navigation }) => {
  const { logout } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock current user - in a real app, this would come from context/state
  const currentUser: User = {
    userId: 'mentor1',
    name: 'Mike',
    role: 'mentor',
    email: 'mentor@example.com',
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.getStudentsByMentor(currentUser.userId);
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

  const handleStudentPress = (student: Student) => {
    navigation.navigate('LessonsList', { student });
  };

  const handleViewAllLessons = () => {
    navigation.navigate('LessonsList');
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
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>👨‍🏫</Text>
            </View>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{currentUser.name}</Text>
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

      {/* Students Section */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>My Students</Text>
            <Text style={styles.sectionSubtitle}>Manage your assigned students</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading students...</Text>
          </View>
        ) : students.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>👥</Text>
            </View>
            <Text style={styles.emptyText}>No students assigned</Text>
            <Text style={styles.emptySubtext}>Students will appear here once assigned to you</Text>
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
            onPress={handleViewAllLessons}
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Stats Section */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Teaching Stats</Text>
            <Text style={styles.sectionSubtitle}>Your teaching overview</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{students.length}</Text>
            <Text style={styles.statLabel}>Active Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
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
    backgroundColor: COLORS.warning,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.small / 2,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default MentorDashboardScreen;
