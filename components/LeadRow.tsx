import React from "react";
import { Lead, Task } from "../types";
import { LEAD_TABLE_COLUMNS } from "../constants";
import Cell from "./cell";

interface LeadRowProps {
  lead: Lead;
  gridTemplateColumns: string;
  onSelectLead: (lead: Lead) => void;
  onChange: (leadId: number, columnId: keyof Lead, value: any) => void;
  activePopover: { leadId: number; columnId: string } | null;
  setActivePopover: (
    popover: { leadId: number; columnId: string } | null
  ) => void;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleSelectChange: (leadId: number, checked: boolean) => void;
  selected: boolean;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: number) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({
  lead,
  gridTemplateColumns,
  onSelectLead,
  onChange,
  activePopover,
  setActivePopover,
  tableContainerRef,
  tasks,
  setTasks,
  handleSelectChange,
  selected,
  handleDragStart,
}) => {
  return (
    <div
      key={lead.id}
      className="grid items-center border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20 group relative"
      style={{ gridTemplateColumns }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex items-center justify-center p-2.5 border-r border-gray-700 h-full">
        <div className="absolute left-0 top-0 bottom-0 w-full h-full flex items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => handleSelectChange(lead.id, e.target.checked)}
            className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500 ml-3 z-10"
          />
          <div className="flex items-center ml-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onChange(lead.id, "addRow", lead.id)}
              className="p-1 rounded hover:bg-gray-700"
            >
              {/* Plus icon */}
            </button>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, lead.id)}
              className="p-1 rounded hover:bg-gray-700 cursor-grab"
            >
              {/* Grip icon */}
            </div>
          </div>
        </div>
      </div>
      {LEAD_TABLE_COLUMNS.map((col) => (
        <Cell
          key={`${lead.id}-${col.id}`}
          lead={lead}
          columnId={col.id as keyof Lead}
          onChange={onChange}
          onSelectLead={onSelectLead}
          activePopover={activePopover}
          setActivePopover={setActivePopover}
          tableContainerRef={tableContainerRef}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default LeadRow;
