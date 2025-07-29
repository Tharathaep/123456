export enum UserRole {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

export enum InternshipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  
  // Student specific fields
  studentId?: string;
  major?: string;
  year?: number;
  resume?: string;
  gpa?: number;
  
  // Company specific fields
  companyName?: string;
  companyAddress?: string;
  contactPerson?: string;
  phone?: string;
  website?: string;
  
  // Admin specific fields
  department?: string;
  position?: string;
}

export interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string;
  duration: string;
  stipend?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  maxApplicants: number;
  status: InternshipStatus;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  company: User;
  applications: Application[];
}

export interface Application {
  id: string;
  coverLetter: string;
  resume: string;
  transcript?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt?: Date;
  notes?: string;
  studentId: string;
  student: User;
  internshipId: string;
  internship: Internship;
  progressReports: ProgressReport[];
  evaluations: Evaluation[];
}

export interface ProgressReport {
  id: string;
  week: number;
  title: string;
  content: string;
  hoursWorked: number;
  challenges?: string;
  achievements?: string;
  nextWeekPlan?: string;
  submittedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  applicationId: string;
  application: Application;
  studentId: string;
  student: User;
}

export interface Evaluation {
  id: string;
  technicalSkills: number;
  communication: number;
  teamwork: number;
  initiative: number;
  overallRating: number;
  comments: string;
  evaluatedAt: Date;
  applicationId: string;
  application: Application;
  evaluatorId: string;
  evaluator: User;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalStudents: number;
  totalCompanies: number;
  totalInternships: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

export interface StudentDashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  activeInternships: number;
  completedReports: number;
}

export interface CompanyDashboardStats {
  totalInternships: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  activeInterns: number;
}

export interface AdminDashboardStats {
  totalStudents: number;
  totalCompanies: number;
  totalInternships: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  activeInterns: number;
}