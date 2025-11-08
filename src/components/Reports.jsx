import React, { useMemo, useState } from 'react';
import { Calendar, Download } from 'lucide-react';

const formatDate = (d) => new Date(d).toISOString().slice(0, 10);

const Reports = ({ students, attendance }) => {
  const [from, setFrom] = useState(formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [to, setTo] = useState(formatDate(Date.now()));

  const datesInRange = useMemo(() => {
    const start = new Date(from);
    const end = new Date(to);
    const arr = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      arr.push(d.toISOString().slice(0, 10));
    }
    return arr;
  }, [from, to]);

  const summary = useMemo(() => {
    const map = new Map();
    students.forEach((s) => map.set(s.id, { present: 0, total: datesInRange.length, name: s.name, roll: s.roll }));
    datesInRange.forEach((date) => {
      const day = attendance[date] || {};
      students.forEach((s) => {
        if (day[s.id]) map.get(s.id).present += 1;
      });
    });
    return Array.from(map.values()).sort((a, b) => a.roll.localeCompare(b.roll));
  }, [students, attendance, datesInRange]);

  const exportCSV = () => {
    const headers = ['Roll', 'Name', 'Present', 'Total', 'Percentage'];
    const rows = summary.map((s) => {
      const pct = s.total ? Math.round((s.present / s.total) * 100) : 0;
      return [s.roll, s.name, s.present, s.total, `${pct}%`];
    });
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${from}_to_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="text-sm text-gray-700">From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="ml-auto rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="text-sm text-gray-700">To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="ml-auto rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div className="max-h-72 overflow-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 font-medium">Roll</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Present</th>
              <th className="px-3 py-2 font-medium">Total</th>
              <th className="px-3 py-2 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {summary.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-3 py-6 text-center text-gray-500">No data in selected range.</td>
              </tr>
            ) : (
              summary.map((s) => {
                const pct = s.total ? Math.round((s.present / s.total) * 100) : 0;
                return (
                  <tr key={s.roll} className="border-t">
                    <td className="px-3 py-2">{s.roll}</td>
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">{s.present}</td>
                    <td className="px-3 py-2">{s.total}</td>
                    <td className="px-3 py-2">{pct}%</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Reports;