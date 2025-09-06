import React, { useState } from 'react';
import { saveCourseNodes, loadCourseNodes } from '../utils/localStorage';

interface CategoryOption {
  value: string;
  label: string;
}

interface CourseFormData {
  courseName: string;
  category: string;
  lectureNotes: string;
}

interface AnalyzedCourse {
  id: string;
  label: string;
  category: string;
  topics: string[];
  skills: string[];
  connections: string[];
  lectureNotes: string;
}

interface CourseFormProps {
  onSubmit?: (courses: AnalyzedCourse[]) => void;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: '', label: 'Select category' },
  { value: 'CS', label: 'Computer Science' },
  { value: 'Math', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Other', label: 'Other' },
];

export default function CourseForm({ onSubmit }: CourseFormProps): React.ReactElement {
  // State for multiple courses
  const [courses, setCourses] = useState([
    { courseName: '', category: '', lectureNotes: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle change for a specific course row
  const handleChange = (idx: number, e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourses((prev) =>
      prev.map((course, i) =>
        i === idx ? { ...course, [name]: value } : course
      )
    );
  };

  // Add a new empty course row
  const handleAddCourse = () => {
    setCourses((prev) => [...prev, { courseName: '', category: '', lectureNotes: '' }]);
  };

  // Remove a course row
  const handleRemoveCourse = (idx: number) => {
    setCourses((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit all courses
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validate all courses
    for (const course of courses) {
      if (!course.courseName.trim() || !course.category) {
        alert('Please enter a course name and select a category for each course.');
        return;
      }
    }
    setIsSubmitting(true);
    try {
      // For each course, call analyzeCourse API and build node
      const analyzedCourses = await Promise.all(
        courses.map(async (course) => {
          // TODO: Replace with real AI integration
          const response = await fetch('/api/analyzeCourse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course),
          });
          const result = await response.json();
          return {
            id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
            label: course.courseName,
            category: course.category,
            topics: result.topics,
            skills: result.skills,
            connections: result.connections,
            lectureNotes: course.lectureNotes,
          };
        })
      );
      // Save all nodes to localStorage
      const existing = loadCourseNodes() || { nodes: [], edges: [] };
      const updatedNodes = [...(existing.nodes || []), ...analyzedCourses];
      saveCourseNodes({ ...existing, nodes: updatedNodes });
      if (onSubmit) onSubmit(analyzedCourses);
      setCourses([{ courseName: '', category: '', lectureNotes: '' }]);
    } catch (error) {
      alert('Error processing courses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {courses.map((course, idx) => (
          <div key={idx} className="border-b pb-4 mb-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Course {idx + 1}</span>
              {courses.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCourse(idx)}
                  className="text-red-500 hover:text-red-700 text-xs"
                  aria-label="Remove course"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor={`courseName-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Course Name *
              </label>
              <input
                type="text"
                id={`courseName-${idx}`}
                name="courseName"
                value={course.courseName}
                onChange={(e) => handleChange(idx, e)}
                placeholder="e.g., Introduction to Computer Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`category-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id={`category-${idx}`}
                name="category"
                value={course.category}
                onChange={(e) => handleChange(idx, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`lectureNotes-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Lecture Notes
              </label>
              <textarea
                id={`lectureNotes-${idx}`}
                name="lectureNotes"
                value={course.lectureNotes}
                onChange={(e) => handleChange(idx, e)}
                placeholder="Paste your lecture notes here..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>
          </div>
        ))}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAddCourse}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Course
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
