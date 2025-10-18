import React, { useState, useRef, useEffect } from "react";
import { Priority } from "../types";

const COLORS: Record<Priority, string> = {
  [Priority.Low]: "bg-green-600/30 text-green-300",
  [Priority.Medium]: "bg-yellow-600/30 text-yellow-300",
  [Priority.High]: "bg-red-600/30 text-red-300",
};

const LABELS: Record<Priority, string> = {
  [Priority.Low]: "Low",
  [Priority.Medium]: "Medium",
  [Priority.High]: "High",
};

interface PriorityDropdownProps {
  value?: Priority;
  onChange: (priority: Priority | undefined) => void;
}

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="min-w-[70px] rounded px-2 py-0.5 text-xs"
        onClick={() => setOpen(!open)}
      >
        {value ? (
          <span className={`font-medium px-2 py-0.5 rounded ${COLORS[value]}`}>{LABELS[value]}</span>
        ) : (
          <span className="text-gray-400">Empty</span>
        )}
      </button>
      {open && (
        <div className="absolute z-20 left-0 mt-1 w-32 rounded shadow-lg bg-[#222] border border-gray-800 py-1 space-y-1 animate-fade-in">
          {(Object.values(Priority) as Priority[]).map((pri) => (
            <button
              type="button"
              key={pri}
              className={`block w-full text-left px-2 py-1 rounded-lg font-medium ${COLORS[pri]} hover:bg-white/10`}
              onClick={() => {
                onChange(pri);
                setOpen(false);
              }}
            >
              {LABELS[pri]}
            </button>
          ))}
          <button
            type="button"
            className="block w-full text-left px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-700"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
