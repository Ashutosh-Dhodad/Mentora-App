export interface User {
  userId: string;
  name: string;
  role: 'parent' | 'student' | 'mentor';
  email?: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  parentId?: string;
  mentorId?: string;
}

export interface Lesson {
  id: string;
  name: string;
  description?: string;
}

export interface Session {
  id: string;
  lessonId: string;
  topic: string;
  date: string;
  summary: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface CreateStudentData {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
