"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function UserPage(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-3xl text-blue-700 font-bold">
          {user.user?.email?.[0]?.toUpperCase() || 'U'}
        </span>
        <div>
          <div className="font-semibold text-lg">{user.user?.email || 'User'}</div>
          <div className="text-gray-500">{user.university?.toUpperCase() || 'No university selected'}</div>
        </div>
      </div>
      <div className="mb-2"><strong>Degree:</strong> {user.degree?.replace(/-/g, ' ') || '-'}</div>
      <div className="mb-2"><strong>Major:</strong> {user.major?.replace(/-/g, ' ') || '-'}</div>
      <div className="mb-2"><strong>Sub-major:</strong> {user.subMajor?.replace(/-/g, ' ') || '-'}</div>
      <div className="mb-2"><strong>Courses:</strong></div>
      <ul className="list-disc list-inside text-gray-700">
        {user.courses?.length ? user.courses.map(c => (
          <li key={c.id}>{c.name} <span className="text-xs text-gray-400">({c.category})</span></li>
        )) : <li>No courses</li>}
      </ul>
    </div>
  );
}
