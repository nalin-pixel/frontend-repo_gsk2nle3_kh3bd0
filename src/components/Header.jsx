import React from 'react';
import { User, LogOut, School } from 'lucide-react';

const Header = ({ teacher, onLogout }) => {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <School className="h-6 w-6 text-indigo-600" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Student Attendance Management
          </h1>
        </div>
        {teacher ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User className="h-4 w-4 text-gray-500" />
              <span className="hidden sm:inline">{teacher}</span>
              <span className="sm:hidden">{teacher?.[0]?.toUpperCase()}</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[.99]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;