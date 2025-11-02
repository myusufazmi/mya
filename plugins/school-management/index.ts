import { Plugin } from '@/types/plugin'

export const schoolPlugin: Plugin = {
  metadata: {
    id: 'school-management',
    name: 'School Management',
    version: '1.0.0',
    author: 'CMS Team',
    description: 'Sistem manajemen sekolah lengkap dengan kelas, siswa, guru, dan jadwal pelajaran',
    category: 'school',
    icon: 'GraduationCap',
    license: 'MIT',
  },

  settings: {
    schoolName: '',
    schoolAddress: '',
    academicYear: '2024/2025',
    enableAttendance: true,
    enableGrading: true,
    maxStudentsPerClass: 40,
  },

  routes: [
    {
      path: '/admin/school/dashboard',
      component: 'school-dashboard',
      title: 'School Dashboard',
      icon: 'LayoutDashboard',
      adminOnly: true,
    },
    {
      path: '/admin/school/classes',
      component: 'class-list',
      title: 'Classes',
      icon: 'Users',
      adminOnly: true,
    },
    {
      path: '/admin/school/students',
      component: 'student-list',
      title: 'Students',
      icon: 'UserCheck',
      adminOnly: true,
    },
    {
      path: '/admin/school/teachers',
      component: 'teacher-list',
      title: 'Teachers',
      icon: 'UserSquare',
      adminOnly: true,
    },
    {
      path: '/admin/school/schedule',
      component: 'schedule-manager',
      title: 'Schedule',
      icon: 'Calendar',
      adminOnly: true,
    },
    {
      path: '/admin/school/subjects',
      component: 'subject-list',
      title: 'Subjects',
      icon: 'BookOpen',
      adminOnly: true,
    },
  ],

  database: {
    tables: [
      {
        name: 'school_classes',
        schema: `
          CREATE TABLE school_classes (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            grade_level INTEGER NOT NULL,
            academic_year VARCHAR(20) NOT NULL,
            teacher_id UUID REFERENCES profiles(id),
            max_students INTEGER DEFAULT 40,
            room_number VARCHAR(20),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_students',
        schema: `
          CREATE TABLE school_students (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            student_number VARCHAR(50) UNIQUE NOT NULL,
            full_name VARCHAR(200) NOT NULL,
            class_id UUID REFERENCES school_classes(id),
            birth_date DATE,
            gender VARCHAR(20),
            address TEXT,
            parent_name VARCHAR(200),
            parent_phone VARCHAR(50),
            email VARCHAR(100),
            enrollment_date DATE DEFAULT CURRENT_DATE,
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_teachers',
        schema: `
          CREATE TABLE school_teachers (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES profiles(id),
            employee_number VARCHAR(50) UNIQUE NOT NULL,
            full_name VARCHAR(200) NOT NULL,
            specialization VARCHAR(100),
            phone VARCHAR(50),
            email VARCHAR(100),
            hire_date DATE,
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_subjects',
        schema: `
          CREATE TABLE school_subjects (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            code VARCHAR(20) UNIQUE NOT NULL,
            description TEXT,
            credits INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_schedule',
        schema: `
          CREATE TABLE school_schedule (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            class_id UUID REFERENCES school_classes(id),
            subject_id UUID REFERENCES school_subjects(id),
            teacher_id UUID REFERENCES school_teachers(id),
            day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            room_number VARCHAR(20),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_attendance',
        schema: `
          CREATE TABLE school_attendance (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            student_id UUID REFERENCES school_students(id),
            class_id UUID REFERENCES school_classes(id),
            date DATE NOT NULL,
            status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
            notes TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'school_grades',
        schema: `
          CREATE TABLE school_grades (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            student_id UUID REFERENCES school_students(id),
            subject_id UUID REFERENCES school_subjects(id),
            semester VARCHAR(20) NOT NULL,
            grade_type VARCHAR(50) NOT NULL,
            score DECIMAL(5,2),
            max_score DECIMAL(5,2) DEFAULT 100,
            notes TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
    ],
  },

  async onActivate() {
    console.log('School Management plugin activated')
    // Create default subjects if needed
    // Send notification to admin
  },

  async onDeactivate() {
    console.log('School Management plugin deactivated')
  },

  async onUninstall() {
    console.log('School Management plugin uninstalled')
    // Clean up plugin data
  },
}
