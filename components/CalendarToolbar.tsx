// CalendarToolbar.tsx
import React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface CalendarToolbarProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-white">
      {currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}
    </h3>
    <div className="flex items-center space-x-2 text-sm text-gray-300">
      <button className="px-3 py-1 rounded hover:bg-gray-800 transition-colors">
        No date (3)
      </button>
      <div className="border-l border-gray-700 h-5"></div>
      <button className="flex items-center space-x-2 px-3 py-1 rounded bg-[#2F2F2F] hover:bg-gray-700 transition-colors">
        <CalendarIcon className="w-4 h-4" />
        <span>Manage in Calendar</span>
      </button>
      <div className="flex items-center border border-gray-700 rounded-md">
        <button
          onClick={onPrevMonth}
          className="p-1.5 hover:bg-gray-800 rounded-l-md transition-colors border-r border-gray-700"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onToday}
          className="px-3 py-1 hover:bg-gray-800 transition-colors border-r border-gray-700"
        >
          Today
        </button>
        <button
          onClick={onNextMonth}
          className="p-1.5 hover:bg-gray-800 rounded-r-md transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default CalendarToolbar;
