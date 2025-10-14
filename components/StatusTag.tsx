import React from "react";
import { Priority } from "../types";

const COLORS: Record<Priority, string> = {
  [Priority.Low]: "bg-green-600/30 text-green-300",
  [Priority.Medium]: "bg-yellow-600/30 text-yellow-300",
  [Priority.High]: "bg-red-600/30 text-red-300",
};

interface PriorityTagProps {
  type?: Priority;
}

const PriorityTag: React.FC<PriorityTagProps> = ({ type }) => {
  if (!type) {
    return <span className="text-gray-500 px-2">Empty</span>;
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${COLORS[type]}`}>
      {type}
    </span>
  );
};

export default PriorityTag;
