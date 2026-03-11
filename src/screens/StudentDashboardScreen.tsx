import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card, Button } from '../components';
import { COLORS, SIZES } from '../constants';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface StudentDashboardScreenProps {
  navigation: any;
  route: any;
  user?: User;
  onLogout?: () => void;
}

const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({ navigation }) => {
  const { logout } = useAuth();
  // Mock current user - in a real app, this would come from context/state
  const currentUser: User = {
    userId: 'student1',
    name: 'Jane',
    role: 'student',
    email: 'student@example.com',
  };

  const handleViewLessons = () => {
    navigation.navigate('LessonsList');
  };

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>👩‍🎓</Text>
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

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>My Learning</Text>
        <Text style={styles.description}>
          Continue your learning journey by exploring available lessons and sessions.
        </Text>
        
        <Button
          title="View All Lessons"
          onPress={handleViewLessons}
          style={styles.actionButton}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Available Lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.activityText}>
          Mathematics - Algebra Basics
        </Text>
        <Text style={styles.activityDate}>
          Last accessed: March 15, 2024
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.success,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SIZES.large,
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
  activityText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SIZES.small / 2,
  },
  activityDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default StudentDashboardScreen;
