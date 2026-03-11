import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { Button, Input } from '../components';
import { COLORS, SIZES } from '../constants';
import { LoginCredentials, User } from '../types';
import { api } from '../services/api';

interface LoginScreenProps {
  navigation: any;
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLogin }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    emailOrPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  const handleLogin = async () => {
    // Basic validation
    const newErrors: Partial<LoginCredentials> = {};
    if (!credentials.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone is required';
    }
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await api.login(credentials);
      if (response.success && response.data) {
        onLogin(response.data);
      } else {
        Alert.alert('Error', response.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Mentora</Text>
        <Text style={styles.subtitle}>Connect, Learn, Grow</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email or Phone"
          value={credentials.emailOrPhone}
          onChangeText={(text) => setCredentials({ ...credentials, emailOrPhone: text })}
          error={errors.emailOrPhone}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email or phone"
        />

        <Input
          label="Password"
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          error={errors.password}
          secureTextEntry
          placeholder="Enter your password"
        />

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        />

        <Button
          title="Forgot Password?"
          onPress={() => Alert.alert('Info', 'Forgot password feature coming soon!')}
          variant="secondary"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Test Accounts:
        </Text>
        <Text style={styles.testAccount}>
          Parent: parent@example.com / password123
        </Text>
        <Text style={styles.testAccount}>
          Student: student@example.com / password123
        </Text>
        <Text style={styles.testAccount}>
          Mentor: mentor@example.com / password123
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SIZES.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.extraLarge * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.small,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  form: {
    marginBottom: SIZES.extraLarge * 2,
  },
  loginButton: {
    marginBottom: SIZES.medium,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  testAccount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default LoginScreen;
