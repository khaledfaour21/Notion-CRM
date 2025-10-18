import React, { useState, useRef, useEffect } from "react";
import { Task, Lead, TaskStatus, Priority } from "../types";
import { TASK_TABLE_COLUMNS } from "../constants";
import { PlusIcon, InfoIcon, FileTextIcon } from "./icons";

// القيم والأنماط للأولوية (Priority)
const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: Priority.Low, label: "Low", color: "bg-green-600/30 text-green-300" },
  { value: Priority.Medium, label: "Medium", color: "bg-yellow-600/30 text-yellow-300" },
  { value: Priority.High, label: "High", color: "bg-red-600/30 text-red-300" }
];

// قائمة الأولوية بموقع ثابت أعلى الجدول
const PriorityDropdown: React.FC<{
  value?: Priority;
  onChange: (priority: Priority | undefined) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        left: rect.left,
        top: Math.max(rect.top - 8, 10), // يمنع القائمة من الخروج خارج الشاشة
        zIndex: 50,
        minWidth: "130px"
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div>
      <button
        ref={btnRef}
        type="button"
        className="min-w-[70px] rounded px-2 py-0.5 text-xs"
        onClick={() => setOpen((o) => !o)}
      >
        {value
          ? (
            <span className={`font-medium px-2 py-0.5 rounded ${PRIORITIES.find(p => p.value === value)?.color}`}>
              {PRIORITIES.find(p => p.value === value)?.label}
            </span>
          )
          : <span className="text-gray-400">Empty</span>
        }
      </button>
      {open && (
        <div style={menuStyle} className="rounded shadow-lg bg-[#222] border border-gray-800 py-1 space-y-1 animate-fade-in">
          {PRIORITIES.map(({ value: pval, label, color }) =>
            <button
              type="button"
              key={label}
              className={`block w-full text-left px-2 py-1 rounded-lg font-medium ${color} hover:bg-white/10`}
              onClick={() => { onChange(pval); setOpen(false); }}
            >
              {label}
            </button>
          )}
          <button type="button" className="block w-full text-left px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-700"
            onClick={() => { onChange(undefined); setOpen(false); }}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

// القيم والأنماط للحالة (Status)
const STATUS_GROUPS = [
  { label: "To-do", items: [TaskStatus.ToDo] },
  { label: "In progress", items: [TaskStatus.InProgress] },
  { label: "Complete", items: [TaskStatus.Done, TaskStatus.Complete] }
];

const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.ToDo]: "bg-gray-600/30 text-gray-200",
  [TaskStatus.InProgress]: "bg-blue-600/30 text-blue-300",
  [TaskStatus.Done]: "bg-lime-600/30 text-lime-300",
  [TaskStatus.Complete]: "bg-green-600/30 text-green-300",
  [TaskStatus.NoStatus]: "bg-gray-800/30 text-gray-400"
};

// قائمة الحالات بموقع ثابت فوق الجدول
const StatusDropdown: React.FC<{
  value?: TaskStatus;
  onChange: (status: TaskStatus | undefined) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        left: rect.left,
        top: Math.max(rect.top - 8, 10),
        zIndex: 50,
        minWidth: "140px"
      });
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div>
      <button
        ref={btnRef}
        type="button"
        className="min-w-[90px] rounded px-1 py-0.5 text-xs"
        onClick={() => setOpen((o) => !o)}
      >
        {value
          ? (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${STATUS_COLORS[value]}`}>
              {value}
            </span>
          )
          : <span className="text-gray-400">Empty</span>
        }
      </button>
      {open && (
        <div style={menuStyle} className="rounded shadow-lg bg-[#222] border border-gray-800 py-1 space-y-2 animate-fade-in">
          {STATUS_GROUPS.map(({ label, items }) => (
            <div key={label}>
              <div className="px-2 py-1 text-xs uppercase text-gray-400">{label}</div>
              <div className="space-y-1">
                {items.map((status) => (
                  <button
                    type="button"
                    key={status}
                    className={`block w-full text-left px-2 py-1 rounded-lg font-medium ${STATUS_COLORS[status]} hover:bg-white/10`}
                    onClick={() => { onChange(status); setOpen(false); }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button type="button" className="block w-full text-left px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-700"
            onClick={() => { onChange(undefined); setOpen(false); }}>
            Edit property
          </button>
        </div>
      )}
    </div>
  );
};

interface AllTasksViewProps {
  tasks: Task[];
  leads: Lead[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AllTasksView: React.FC<AllTasksViewProps> = ({
  tasks,
  leads,
  setTasks,
}) => {
  const handleCellChange = (
    taskId: number,
    columnId: keyof Task,
    value: string | number | null | undefined
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, [columnId]: value } : task
      )
    );
  };

  const addRow = () => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask: Task = {
      id: newId,
      title: "",
      status: TaskStatus.NoStatus,
      leadId: null,
      priority: undefined,
    };
    setTasks([...tasks, newTask]);
  };

  const columnWidths: Record<string, string> = {
    title: "minmax(250px, 1.5fr)",
    leadId: "minmax(150px, 1fr)",
    status: "150px",
    dueDate: "180px",
    priority: "120px",
    notes: "minmax(200px, 1fr)",
  };

  const gridTemplateColumns = `${TASK_TABLE_COLUMNS.map(
    (c) => columnWidths[c.id] || "minmax(150px, 1fr)"
  ).join(" ")}`;

  return (
    <div className="text-sm">
      <div className="border border-gray-800 rounded-lg overflow-x-auto">
        <div className="min-w-max">
          {/* Table Header */}
          <div
            className="grid bg-[#202020] border-b border-gray-700 sticky top-0 z-10"
            style={{ gridTemplateColumns }}
          >
            {TASK_TABLE_COLUMNS.map((col) => (
              <div
                key={col.id}
                className="flex items-center space-x-2 p-2.5 font-medium text-gray-400 border-r border-gray-700 last:border-r-0"
              >
                {col.icon}
                <span>{col.title}</span>
                <InfoIcon className="w-3 h-3 text-gray-500" />
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="grid items-center border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20 group"
                style={{ gridTemplateColumns }}
              >
                {TASK_TABLE_COLUMNS.map((col) => (
                  <Cell
                    key={`${task.id}-${col.id}`}
                    task={task}
                    leads={leads}
                    columnId={col.id as keyof Task}
                    onChange={handleCellChange}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div
            onClick={addRow}
            className="flex items-center space-x-2 p-2.5 cursor-pointer text-gray-400 hover:bg-gray-800/40"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CellProps {
  task: Task;
  leads: Lead[];
  columnId: keyof Task;
  onChange: (taskId: number, columnId: keyof Task, value: any) => void;
}

const Cell: React.FC<CellProps> = ({ task, leads, columnId, onChange }) => {
  const commonInputClasses =
    "bg-transparent w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-0.5";
  const commonCellClasses =
    "p-2.5 border-r border-gray-700 last:border-r-0 h-full flex items-center";

  switch (columnId) {
    case "title":
      return (
        <div className={`${commonCellClasses} space-x-2`}>
          <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            type="text"
            value={task.title}
            onChange={(e) => onChange(task.id, "title", e.target.value)}
            className={commonInputClasses}
          />
        </div>
      );
    case "leadId":
      const lead = leads.find((l) => l.id === task.leadId);
      return (
        <div className={`${commonCellClasses} space-x-2`}>
          {lead ? (
            <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
          ) : (
            <div className="w-4 h-4 shrink-0" />
          )}
          <span>{lead ? lead.name : "New page"}</span>
        </div>
      );
    case "status":
      return (
        <div className={commonCellClasses}>
          <StatusDropdown
            value={task.status}
            onChange={(status) => onChange(task.id, "status", status)}
          />
        </div>
      );
    case "priority":
      return (
        <div className={commonCellClasses}>
          <PriorityDropdown
            value={task.priority}
            onChange={(priority) => onChange(task.id, "priority", priority)}
          />
        </div>
      );
    case "dueDate":
      const dateVal = task.dueDate;
      return (
        <div className={commonCellClasses}>
          <input
            type="date"
            value={dateVal ? dateVal.split("T")[0] : ""}
            onChange={(e) =>
              onChange(
                task.id,
                "dueDate",
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }
            className={`${commonInputClasses} text-gray-300 [color-scheme:dark]`}
          />
        </div>
      );
    case "notes":
      return (
        <div className={commonCellClasses}>
          <input
            type="text"
            value={task.notes || ""}
            onChange={(e) => onChange(task.id, "notes", e.target.value)}
            className={commonInputClasses}
          />
        </div>
      );
    default:
      return <div className={commonCellClasses}></div>;
  }
};

export default AllTasksView;
