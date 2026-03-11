import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { Button, Input, Card } from '../components';
import { COLORS, SIZES } from '../constants';
import { CreateStudentData } from '../types';
import { api } from '../services/api';

interface CreateStudentScreenProps {
  navigation: any;
  route: any;
}

const CreateStudentScreen: React.FC<CreateStudentScreenProps> = ({ navigation, route }) => {
  const [studentData, setStudentData] = useState<CreateStudentData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateStudentData>>({});

  const handleCreateStudent = async () => {
    // Enhanced validation
    const newErrors: Partial<CreateStudentData> = {};
    
    // Name validation
    if (!studentData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (studentData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(studentData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Surname validation
    if (!studentData.surname.trim()) {
      newErrors.surname = 'Surname is required';
    } else if (studentData.surname.trim().length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(studentData.surname.trim())) {
      newErrors.surname = 'Surname can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Email validation
    if (!studentData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!studentData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (studentData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(studentData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Date of birth validation
    if (!studentData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      // Normalize date format
      const normalizedDate = studentData.dateOfBirth.replace(/[\/\\-]/g, '-');
      const birthDate = new Date(normalizedDate);
      
      if (isNaN(birthDate.getTime())) {
        newErrors.dateOfBirth = 'Invalid date format. Use YYYY-MM-DD, YYYY/MM/DD, or YYYY\\MM\\DD';
      } else {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()); // Minimum 5 years old
        
        if (birthDate > today) {
          newErrors.dateOfBirth = 'Date of birth cannot be in the future';
        } else if (birthDate < minDate) {
          newErrors.dateOfBirth = 'Date of birth cannot be more than 100 years ago';
        } else if (birthDate > maxDate) {
          newErrors.dateOfBirth = 'Student must be at least 5 years old';
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await api.createStudent(studentData, 'parent1');
      if (response.success) {
        Alert.alert(
          'Success',
          'Student created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', response.error || 'Failed to create student');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>👨‍🎓</Text>
          </View>
        </View>
        <Text style={styles.title}>Create New Student</Text>
        <Text style={styles.subtitle}>Add a new student to your account</Text>
      </View>

      {/* Form Section */}
      <Card style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Student Information</Text>
          <Text style={styles.formSubtitle}>Please fill in the details below</Text>
        </View>

        <View style={styles.formContent}>
          <Input
            label="Name"
            value={studentData.name}
            onChangeText={(text) => setStudentData({ ...studentData, name: text })}
            error={errors.name}
            placeholder="Enter student's first name"
            style={styles.input}
          />

          <Input
            label="Surname"
            value={studentData.surname}
            onChangeText={(text) => setStudentData({ ...studentData, surname: text })}
            error={errors.surname}
            placeholder="Enter student's last name"
            style={styles.input}
          />

          <Input
            label="Email"
            value={studentData.email}
            onChangeText={(text) => setStudentData({ ...studentData, email: text })}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="student@example.com"
            style={styles.input}
          />

          <Input
            label="Password"
            value={studentData.password}
            onChangeText={(text) => setStudentData({ ...studentData, password: text })}
            error={errors.password}
            secureTextEntry
            style={styles.input}
          />

          <Input
            label="Date of Birth"
            value={studentData.dateOfBirth}
            onChangeText={(text) => setStudentData({ ...studentData, dateOfBirth: text })}
            error={errors.dateOfBirth}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Create Student"
          onPress={handleCreateStudent}
          loading={loading}
          style={styles.createButton}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="secondary"
          style={styles.cancelButton}
        />
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
    paddingBottom: SIZES.extraLarge,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.extraLarge,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.extraLarge,
    borderBottomRightRadius: SIZES.extraLarge,
  },
  iconContainer: {
    marginBottom: SIZES.medium,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.card,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.card,
    opacity: 0.9,
    textAlign: 'center',
  },
  formCard: {
    margin: SIZES.medium,
    marginTop: SIZES.large,
    padding: SIZES.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formHeader: {
    marginBottom: SIZES.large,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  formContent: {
    gap: SIZES.medium,
  },
  input: {
    marginBottom: SIZES.small,
  },
  buttonContainer: {
    paddingHorizontal: SIZES.medium,
    gap: SIZES.medium,
    marginTop: SIZES.medium,
  },
  createButton: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default CreateStudentScreen;
