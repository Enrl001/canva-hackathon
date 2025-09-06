"use client";
import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { login, setUniversity, setDegree, setMajor, setSubMajor, setCourses, RootState } from '../app/store';
import LoginForm from '../app/components/LoginForm';
import UniversitySelector from '../app/components/UniversitySelector';

interface Course {
  id: string;
  name: string;
  category: 'Core' | 'Major' | 'Sub-major' | 'Elective';
  major?: string;
  subMajor?: string;
}

// Dummy course data for UTS BCS (Honours), Enterprise Software, AWS
const dummyCourses: Course[] = [
  { id: '31265', name: 'Web Systems', category: 'Core', major: 'Enterprise Software Development' },
  { id: '31266', name: 'Database Fundamentals', category: 'Core', major: 'Enterprise Software Development' },
  { id: '31267', name: 'Enterprise Software Architecture', category: 'Major', major: 'Enterprise Software Development' },
  { id: '31268', name: 'AWS Cloud Development', category: 'Sub-major', subMajor: 'AWS Development' },
  { id: '31269', name: 'AWS DevOps', category: 'Sub-major', subMajor: 'AWS Development' },
  // ...add more as needed
];

function IndexFlow(): React.ReactElement | null {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [step, setStep] = useState<number>(0);

  // Step 0: Info page
  if (!user.isLoggedIn && step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Learning Mind Map</h1>
        <p className="mb-8 text-center max-w-xl">Visualize your degree, major, and electives as an interactive mind map. Start by logging in and selecting your university and study plan.</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => setStep(1)}>Login</button>
      </div>
    );
  }

  // Step 1: Login
  if (!user.isLoggedIn && step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <LoginForm onLogin={(u) => { dispatch(login(u)); setStep(2); }} />
      </div>
    );
  }

  // Step 2: University & Degree selection
  if (user.isLoggedIn && !user.university) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-semibold mb-4">Select your university and degree</h2>
        <UniversitySelector onSelect={({ university, degree, major, subMajor }) => {
          dispatch(setUniversity(university));
          dispatch(setDegree(degree));
          dispatch(setMajor(major));
          dispatch(setSubMajor(subMajor));
          // For MVP, set dummy courses
          dispatch(setCourses(dummyCourses));
          setStep(3);
        }} />
      </div>
    );
  }

  // Step 3: Home page with categorized courses as nodes
  if (user.isLoggedIn && user.university && user.degree) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.user?.email || 'Student'}!</h1>
        <h2 className="mb-2">{user.university.toUpperCase()} - {user.degree.replace(/-/g, ' ')}</h2>
        <h3 className="mb-4">Major: {user.major.replace(/-/g, ' ')}, Sub-major: {user.subMajor.replace(/-/g, ' ')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.courses.map((course: Course) => (
            <div key={course.id} className="bg-white rounded shadow p-4 border-l-4" style={{ borderColor: getCategoryColor(course.category) }}>
              <div className="font-semibold text-lg mb-1">{course.name}</div>
              <div className="text-sm text-gray-500">{course.category} {course.major ? `| ${course.major}` : ''} {course.subMajor ? `| ${course.subMajor}` : ''}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function getCategoryColor(category: Course['category']): string {
  switch (category) {
    case 'Core': return '#2563eb';
    case 'Major': return '#059669';
    case 'Sub-major': return '#a21caf';
    case 'Elective': return '#f59e42';
    default: return '#64748b';
  }
}

export default function IndexPage(): React.ReactElement {
  return (
    <Provider store={store}>
      <IndexFlow />
    </Provider>
  );
}
