import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User } from '../types';
import { ROUTES } from '../constants';
import { AuthProvider } from '../contexts/AuthContext';

// Import screens (we'll create these next)
import LoginScreen from '../screens/LoginScreen';
import ParentDashboardScreen from '../screens/ParentDashboardScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen';
import MentorDashboardScreen from '../screens/MentorDashboardScreen';
import CreateStudentScreen from '../screens/CreateStudentScreen';
import LessonsListScreen from '../screens/LessonsListScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ParentTabNavigator = ({ user }: { user: User }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name={ROUTES.PARENT_DASHBOARD} 
        component={ParentDashboardScreen}
        options={{ 
          title: 'Dashboard',
          tabBarLabelStyle: { 
            textAlign: 'center',
            marginHorizontal: 10,
            marginVertical: 5
          }
        }}
      />
      <Tab.Screen 
        name={ROUTES.LESSONS_LIST} 
        component={LessonsListScreen}
        options={{ 
          title: 'Lessons',
          tabBarLabelStyle: { 
            textAlign: 'center',
            marginHorizontal: 10,
            marginVertical: 5
          }
        }}
      />
    </Tab.Navigator>
  );
};

const StudentTabNavigator = () => {
  return (
   <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name={ROUTES.STUDENT_DASHBOARD} 
        component={StudentDashboardScreen}
        options={{ 
          title: 'Dashboard',
          tabBarLabelStyle: { textAlign: 'center' }
        }}
      />
      <Tab.Screen 
        name={ROUTES.LESSONS_LIST} 
        component={LessonsListScreen}
        options={{ 
          title: 'Lessons',
          tabBarLabelStyle: { textAlign: 'center' }
        }}
      />
    </Tab.Navigator>
  );
};

const MentorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name={ROUTES.MENTOR_DASHBOARD} 
        component={MentorDashboardScreen}
        options={{ 
          title: 'Dashboard',
          tabBarLabelStyle: { 
            textAlign: 'center',
            marginHorizontal: 10,
            marginVertical: 5

          }
        }}
      />
      <Tab.Screen 
        name={ROUTES.LESSONS_LIST} 
        component={LessonsListScreen}
        options={{ 
          title: 'Lessons',
          tabBarLabelStyle: { 
            textAlign: 'center',
            marginHorizontal: 10,
            marginVertical: 5
          }
        }}
      />
    </Tab.Navigator>
  );
};

interface AppNavigatorProps {
  user: User | null;
  onLogin?: (user: User) => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ user, onLogin }) => {
  const handleLogout = () => {
    // In a real app, this would clear auth state/context
    // For now, we'll trigger a re-render that shows the login screen
    if (onLogin) {
      onLogin(null as any); // This will cause user to become null and show login
    }
  };

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.LOGIN}>
            {(props) => <LoginScreen {...props} onLogin={onLogin || (() => {})} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <AuthProvider user={user} onLogout={handleLogout}>
      <NavigationContainer>
        <Stack.Navigator>
          {user.role === 'parent' ? (
            <Stack.Screen 
              name="ParentTabs" 
              options={{ headerShown: false }}
            >
              {() => <ParentTabNavigator user={user} />}
            </Stack.Screen>
          ) : user.role === 'student' ? (
            <Stack.Screen 
              name="StudentTabs" 
              component={StudentTabNavigator} 
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen 
              name="MentorTabs" 
              component={MentorTabNavigator} 
              options={{ headerShown: false }}
            />
          )}
          
          <Stack.Screen 
            name={ROUTES.CREATE_STUDENT} 
            component={CreateStudentScreen}
            options={{ title: 'Create Student' }}
          />
          <Stack.Screen 
            name={ROUTES.LESSON_DETAIL} 
            component={LessonDetailScreen}
            options={{ title: 'Lesson Details' }}
          />
          <Stack.Screen 
            name={ROUTES.SESSION_DETAIL} 
            component={SessionDetailScreen}
            options={{ title: 'Session Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
