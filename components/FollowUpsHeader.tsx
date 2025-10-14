import React from "react";
import { InfoIcon } from "./icons";
import { FOLLOW_UPS_TABLE_COLUMNS } from "../constants";

interface FollowUpsHeaderProps {
  gridTemplateColumns: string;
}

const FollowUpsHeader: React.FC<FollowUpsHeaderProps> = ({
  gridTemplateColumns,
}) => (
  <div
    className="grid bg-[#202020] border-b border-gray-700 sticky top-0 z-10"
    style={{ gridTemplateColumns }}
  >
    {FOLLOW_UPS_TABLE_COLUMNS.map((col) => (
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

export default FollowUpsHeader;
