import React, { useMemo } from 'react';
import { CheckCircle2, CircleOff } from 'lucide-react';

const todayKey = () => new Date().toISOString().slice(0, 10);

const Attendance = ({ students, attendance, setAttendance }) => {
  const date = useMemo(() => todayKey(), []);

  const toggle = (id) => {
    setAttendance((prev) => {
      const day = prev[date] || {};
      const current = day[id] || false;
      return { ...prev, [date]: { ...day, [id]: !current } };
    });
  };

  const presentCount = useMemo(() => {
    const day = attendance[date] || {};
    return Object.values(day).filter(Boolean).length;
  }, [attendance, date]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Mark Today's Attendance</h3>
        <div className="text-sm text-gray-600">
          Date: <span className="font-medium text-gray-800">{date}</span>
        </div>
      </div>

      <div className="max-h-72 overflow-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 font-medium">Roll</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-3 py-6 text-center text-gray-500">Add students to start marking attendance.</td>
              </tr>
            ) : (
              students.map((s) => {
                const isPresent = attendance[date]?.[s.id] || false;
                return (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-2">{s.roll}</td>
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => toggle(s.id)}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow border ${
                          isPresent
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                      >
                        {isPresent ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Present
                          </>
                        ) : (
                          <>
                            <CircleOff className="h-4 w-4" /> Absent
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
        <span>Total Students: {students.length}</span>
        <span>Present: {presentCount}</span>
        <span>Absent: {Math.max(0, students.length - presentCount)}</span>
      </div>
    </section>
  );
};

export default Attendance;