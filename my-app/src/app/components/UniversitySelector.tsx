import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectionData {
  university: string;
  degree: string;
  major: string;
  subMajor: string;
}

interface UniversitySelectorProps {
  onSelect: (data: SelectionData) => void;
}

const universities: Option[] = [
  { value: 'uts', label: 'University of Technology Sydney (UTS)' },
];

const degrees: Option[] = [
  { value: 'bcs-honours', label: 'Bachelor of Computing Science (Honours)' },
];

const majors: Option[] = [
  { value: 'enterprise-software', label: 'Enterprise Software Development' },
];

const subMajors: Option[] = [
  { value: 'aws', label: 'AWS Development' },
];

export default function UniversitySelector({ onSelect }: UniversitySelectorProps) {
  const [university, setUniversity] = useState<string>('uts');
  const [degree, setDegree] = useState<string>('bcs-honours');
  const [major, setMajor] = useState<string>('enterprise-software');
  const [subMajor, setSubMajor] = useState<string>('aws');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelect({ university, degree, major, subMajor });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select value={university} onChange={e => setUniversity(e.target.value)} className="w-full px-3 py-2 border rounded">
        {universities.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
      </select>
      <select value={degree} onChange={e => setDegree(e.target.value)} className="w-full px-3 py-2 border rounded">
        {degrees.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select value={major} onChange={e => setMajor(e.target.value)} className="w-full px-3 py-2 border rounded">
        {majors.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>
      <select value={subMajor} onChange={e => setSubMajor(e.target.value)} className="w-full px-3 py-2 border rounded">
        {subMajors.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Continue</button>
    </form>
  );
}
