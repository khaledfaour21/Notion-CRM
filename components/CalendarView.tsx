import React, { useState, useMemo } from "react";
import { Lead } from "../types";
import CalendarToolbar from "./CalendarToolbar";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDayCell from "./CalendarDayCell";

interface CalendarViewProps {
  leads: Lead[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ leads }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-10-01T12:00:00Z")
  );

  const changeMonth = (amount: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid: (Date | null)[] = [];

    // Add days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push(
        new Date(year, month - 1, prevMonthDays - firstDayOfMonth + i + 1)
      );
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(new Date(year, month, i));
    }

    // Add days from next month
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push(new Date(year, month + 1, i));
    }

    return grid;
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const events: { [key: string]: Lead[] } = {};
    leads.forEach((lead) => {
      if (lead.lastContactDate) {
        const dateKey = new Date(lead.lastContactDate)
          .toISOString()
          .split("T")[0];
        if (!events[dateKey]) {
          events[dateKey] = [];
        }
        events[dateKey].push(lead);
      }
    });
    return events;
  }, [leads]);

  return (
    <div>
      <CalendarToolbar
        currentDate={currentDate}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
        onToday={() => setCurrentDate(new Date())}
      />
      <div className="border-t border-l border-gray-800">
        <CalendarWeekdays />
        <div className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-250px)]">
          {calendarGrid.map((date, idx) => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const dateKey = date.toISOString().split("T")[0];
            const dayEvents = eventsByDate[dateKey] || [];
            return (
              <CalendarDayCell
                key={idx}
                date={date}
                isCurrentMonth={isCurrentMonth}
                events={dayEvents}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
