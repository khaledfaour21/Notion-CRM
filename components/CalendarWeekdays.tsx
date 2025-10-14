// CalendarWeekdays.tsx
import React from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarWeekdays: React.FC = () => (
  <div className="grid grid-cols-7">
    {weekdays.map((day) => (
      <div
        key={day}
        className="text-center text-xs font-medium text-gray-400 py-2 border-r border-b border-gray-800 bg-[#202020]"
      >
        {day}
      </div>
    ))}
  </div>
);

export default CalendarWeekdays;
