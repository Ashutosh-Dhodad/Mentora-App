import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card } from '../components';
import { COLORS, SIZES } from '../constants';
import { Session, Student } from '../types';

interface SessionDetailScreenProps {
  navigation: any;
  route: any;
}

const SessionDetailScreen: React.FC<SessionDetailScreenProps> = ({ navigation, route }) => {
  const { session, student } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: 'Session Details' });
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.sessionInfo}>
        <Text style={styles.topic}>{session.topic}</Text>
        <Text style={styles.date}>{formatDate(session.date)}</Text>
        
        {student && (
          <View style={styles.studentSection}>
            <Text style={styles.studentLabel}>Student:</Text>
            <Text style={styles.studentName}>{student.name} {student.surname}</Text>
          </View>
        )}
      </Card>

      <Card style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Session Summary</Text>
        <Text style={styles.summaryText}>{session.summary}</Text>
      </Card>

      <Card style={styles.additionalInfo}>
        <Text style={styles.infoTitle}>Session Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Session ID:</Text>
          <Text style={styles.infoValue}>{session.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Lesson ID:</Text>
          <Text style={styles.infoValue}>{session.lessonId}</Text>
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
  sessionInfo: {
    margin: SIZES.medium,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  date: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SIZES.medium,
  },
  studentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  studentLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginRight: SIZES.small,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  summarySection: {
    margin: SIZES.medium,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  additionalInfo: {
    margin: SIZES.medium,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.medium,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default SessionDetailScreen;
