import React from "react";
import { LEAD_TABLE_COLUMNS } from "../constants";
import { InfoIcon } from "./icons";

interface TableHeaderProps {
  gridTemplateColumns: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ gridTemplateColumns }) => {
  return (
    <div
      className="grid bg-[#202020] border-b border-gray-700 sticky top-0 z-10"
      style={{ gridTemplateColumns }}
    >
      <div className="p-2.5 border-r border-gray-700 flex justify-center items-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500"
          disabled
        />
      </div>
      {LEAD_TABLE_COLUMNS.map((col) => (
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
  );
};

export default TableHeader;
