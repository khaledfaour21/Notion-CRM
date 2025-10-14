import React from "react";
import { Task, TaskStatus, Lead } from "../types";
import { TASK_STATUS_CONFIG } from "../constants";
import TaskCard from "./TaskCard";
import { PlusIcon } from "./icons";

interface TasksBoardViewProps {
  tasks: Task[];
  leads: Lead[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksBoardView: React.FC<TasksBoardViewProps> = ({
  tasks,
  leads,
  setTasks,
}) => {
  const handleDrop = (
    newStatus: TaskStatus,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"), 10);
    if (!taskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    e.currentTarget.classList.remove("bg-gray-700/50");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-700/50");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-700/50");
  };

  const getLeadById = (id: number | null): Lead | undefined => {
    if (id === null) return undefined;
    return leads.find((lead) => lead.id === id);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 h-full">
      {(Object.values(TaskStatus) as TaskStatus[]).map((status) => {
        const config = TASK_STATUS_CONFIG[status];
        const filteredTasks = tasks.filter((t) => t.status === status);

        return (
          <div key={status} className="flex-shrink-0 w-72 flex flex-col">
            <div className="flex items-center space-x-2 p-2">
              {React.cloneElement(config.icon, {
                className: `w-4 h-4 ${config.textColor}`,
              })}
              <span className={`font-medium ${config.textColor}`}>
                {status}
              </span>
              <span className="text-sm text-gray-400">
                {filteredTasks.length}
              </span>
            </div>
            <div
              className={`p-2 space-y-3 rounded-lg ${config.color} flex-grow transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(status, e)}
            >
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  lead={getLeadById(task.leadId)}
                />
              ))}
              <button className="flex items-center space-x-2 p-2 w-full rounded text-gray-400 hover:bg-gray-600/50 transition-colors">
                <PlusIcon className="w-4 h-4" />
                <span>New page</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksBoardView;
