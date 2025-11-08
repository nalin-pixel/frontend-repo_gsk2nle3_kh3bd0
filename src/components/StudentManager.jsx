import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const StudentManager = ({ students, setStudents }) => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');

  const addStudent = (e) => {
    e.preventDefault();
    if (!name.trim() || !roll.trim()) return;
    const exists = students.some((s) => s.roll === roll.trim());
    if (exists) return;
    setStudents((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim(), roll: roll.trim() }]);
    setName('');
    setRoll('');
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Add Students</h3>
      </div>
      <form onSubmit={addStudent} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <input
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          placeholder="Roll no."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="mt-5 max-h-60 overflow-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 font-medium">Roll</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-3 py-6 text-center text-gray-500">No students added yet.</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-3 py-2">{s.roll}</td>
                  <td className="px-3 py-2">{s.name}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => removeStudent(s.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentManager;