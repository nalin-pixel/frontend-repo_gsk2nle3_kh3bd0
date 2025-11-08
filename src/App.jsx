import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import StudentManager from './components/StudentManager';
import Attendance from './components/Attendance';
import Reports from './components/Reports';

function App() {
  const [teacher, setTeacher] = useState('');
  const [students, setStudents] = useState(() => {
    const raw = localStorage.getItem('students');
    return raw ? JSON.parse(raw) : [];
  });
  const [attendance, setAttendance] = useState(() => {
    const raw = localStorage.getItem('attendance');
    return raw ? JSON.parse(raw) : {};
  });

  // Persist
  useMemo(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);
  useMemo(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  const logout = () => setTeacher('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Header teacher={teacher} onLogout={logout} />

      {!teacher ? (
        <Login onLogin={setTeacher} />
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudentManager students={students} setStudents={setStudents} />
            <Attendance students={students} attendance={attendance} setAttendance={setAttendance} />
          </div>
          <Reports students={students} attendance={attendance} />
        </main>
      )}

      <footer className="mt-12 border-t border-gray-200 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
          Demo app — data is stored locally in your browser.
        </div>
      </footer>
    </div>
  );
}

export default App;
