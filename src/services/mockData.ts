import { User, Student, Lesson, Session } from '../types';

export const mockUsers: User[] = [
  {
    userId: 'parent1',
    name: "Jane's Parent",
    role: 'parent',
    email: 'parent@example.com',
  },
  {
    userId: 'parent2',
    name: 'Sarah Parent',
    role: 'parent',
    email: 'sarah@example.com',
  },
  {
    userId: 'parent3',
    name: 'Michael Parent',
    role: 'parent',
    email: 'michael@example.com',
  },
  {
    userId: 'student1',
    name: 'Jane',
    role: 'student',
    email: 'student@example.com',
  },
  {
    userId: 'mentor1',
    name: 'Mike',
    role: 'mentor',
    email: 'mentor@example.com',
  },
];

export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Jane',
    surname: 'Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: '2010-05-15',
    parentId: 'parent1',
    mentorId: 'mentor1',
  },
  {
    id: 'student2',
    name: 'Tom',
    surname: 'Johnson',
    email: 'tom.johnson@example.com',
    dateOfBirth: '2012-08-22',
    parentId: 'parent1',
    mentorId: 'mentor1',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson1',
    name: 'Mathematics',
    description: 'Learn various mathematical concepts',
  },
  {
    id: 'lesson2',
    name: 'Physics',
    description: 'Understand the laws of physics',
  },
  {
    id: 'lesson3',
    name: 'English',
    description: 'Improve language skills',
  },
];

export const mockSessions: Session[] = [
  {
    id: 'session1',
    lessonId: 'lesson1',
    topic: 'Algebra Basics',
    date: '2024-03-15',
    summary: 'Introduction to variables, equations, and basic algebraic operations.',
  },
  {
    id: 'session2',
    lessonId: 'lesson1',
    topic: 'Geometry Fundamentals',
    date: '2024-03-22',
    summary: 'Basic shapes, angles, and geometric properties.',
  },
  {
    id: 'session3',
    lessonId: 'lesson2',
    topic: 'Newton\'s Laws',
    date: '2024-03-18',
    summary: 'Understanding the three fundamental laws of motion.',
  },
  {
    id: 'session4',
    lessonId: 'lesson3',
    topic: 'Essay Writing',
    date: '2024-03-20',
    summary: 'Structure and techniques for effective essay writing.',
  },
];
