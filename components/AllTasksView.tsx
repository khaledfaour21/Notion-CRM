import React from "react";
import { Task, Lead, TaskStatus, Priority } from "../types";
import { TASK_TABLE_COLUMNS } from "../constants";
import { PlusIcon, InfoIcon, FileTextIcon } from "./icons";
import PriorityTag from "./PriorityTag";
import StatusTag from "./StatusTag";

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
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask: Task = {
      id: newId,
      title: "",
      status: TaskStatus.NoStatus,
      leadId: null,
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
        <div className={`${commonCellClasses} relative`}>
          <StatusTag status={task.status} />
          <select
            value={task.status}
            onChange={(e) => onChange(task.id, "status", e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {Object.values(TaskStatus)
              .filter((s) => s !== TaskStatus.Complete)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </div>
      );
    case "priority":
      return (
        <div className={`${commonCellClasses} relative`}>
          <PriorityTag priority={task.priority} />
          <select
            value={task.priority || ""}
            onChange={(e) =>
              onChange(
                task.id,
                "priority",
                (e.target.value || undefined) as Priority
              )
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value="">None</option>
            {Object.values(Priority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
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
