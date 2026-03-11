import { User, Student, Lesson, Session, LoginCredentials, CreateStudentData, ApiResponse } from '../types';
import { mockUsers, mockStudents, mockLessons, mockSessions } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    await delay(1000);
    
    // Simple mock authentication
    const user = mockUsers.find(u => 
      (u.email === credentials.emailOrPhone) && 
      credentials.password === 'password123'
    );

    if (user) {
      return { success: true, data: user };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  },

  // Students
  getStudentsByParent: async (parentId: string): Promise<ApiResponse<Student[]>> => {
    await delay(500);
    const students = mockStudents.filter(s => s.parentId === parentId);
    return { success: true, data: students };
  },

  getStudentsByMentor: async (mentorId: string): Promise<ApiResponse<Student[]>> => {
    await delay(500);
    const students = mockStudents.filter(s => s.mentorId === mentorId);
    return { success: true, data: students };
  },

  createStudent: async (studentData: CreateStudentData, parentId?: string): Promise<ApiResponse<Student>> => {
    await delay(1000);
    const newStudent: Student = {
      id: `student${Date.now()}`,
      ...studentData,
      parentId: parentId || 'parent1', // Default to parent1 for now
      mentorId: 'mentor1', // Assign default mentor so new students appear in mentor dashboard
    };
    mockStudents.push(newStudent);
    return { success: true, data: newStudent };
  },

  // Lessons
  getLessons: async (): Promise<ApiResponse<Lesson[]>> => {
    await delay(500);
    return { success: true, data: mockLessons };
  },

  // Sessions
  getSessionsByLesson: async (lessonId: string): Promise<ApiResponse<Session[]>> => {
    await delay(500);
    const sessions = mockSessions.filter(s => s.lessonId === lessonId);
    return { success: true, data: sessions };
  },

  getSessionById: async (sessionId: string): Promise<ApiResponse<Session>> => {
    await delay(300);
    const session = mockSessions.find(s => s.id === sessionId);
    if (session) {
      return { success: true, data: session };
    } else {
      return { success: false, error: 'Session not found' };
    }
  },
};
