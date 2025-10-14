import React from "react";
import { Task, Lead, Priority } from "../types";
import { FileTextIcon, PlusIcon } from "./icons";

interface TaskCardProps {
  task: Task;
  lead?: Lead;
}

const priorityColors: Record<Priority, string> = {
  [Priority.Low]: "bg-green-600/30 text-green-300",
  [Priority.Medium]: "bg-yellow-600/30 text-yellow-300",
  [Priority.High]: "bg-red-600/30 text-red-300",
};

const TaskCard: React.FC<TaskCardProps> = ({ task, lead }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-[#2F2F2F] p-3 rounded-md border border-gray-700 cursor-grab active:cursor-grabbing shadow-sm"
    >
      <p className="font-medium text-white">{task.title}</p>
      {lead && (
        <div className="flex items-center space-x-2 text-sm text-gray-400 pt-1">
          <FileTextIcon className="w-3 h-3" />
          <span>{lead.name}</span>
        </div>
      )}
      {task.priority && (
        <div className="pt-2">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
