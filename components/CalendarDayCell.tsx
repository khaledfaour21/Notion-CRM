// CalendarDayCell.tsx
import React from "react";
import { Lead } from "../types";
import { PlusIcon } from "./icons";

interface CalendarDayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  events: Lead[];
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  date,
  isCurrentMonth,
  events,
}) => (
  <div className="relative p-2 border-r border-b border-gray-800 group overflow-y-auto">
    <span
      className={`text-sm ${
        isCurrentMonth ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {date.getDate()}
    </span>
    <button className="absolute top-2 right-2 p-1 bg-[#2F2F2F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
      <PlusIcon className="w-3 h-3 text-gray-400" />
    </button>
    <div className="mt-2 space-y-1">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-[#2F2F2F] p-1.5 rounded-md text-xs text-white flex items-center justify-between"
        >
          <span className="truncate">{event.name}</span>
          <span className="flex-shrink-0 ml-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full">
            1
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default CalendarDayCell;
