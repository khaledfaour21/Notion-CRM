import React from "react";
import { Lead, Status } from "../types";
import { PIPELINE_STATUS_CONFIG } from "../constants";
import LeadCard from "./LeadCard";
import { PlusIcon } from "./icons";

interface PipelineColumnProps {
  status: Status;
  leads: Lead[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({
  status,
  leads,
  onDrop,
}) => {
  const config = PIPELINE_STATUS_CONFIG[status];
  const filteredLeads = leads.filter((l) => l.status === status);

  return (
    <div
      className="flex-shrink-0 w-72 flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-center space-x-2 p-2">
        {config.icon}
        <span className={`font-medium ${config.textColor}`}>{status}</span>
        <span className="text-sm text-gray-400">{filteredLeads.length}</span>
      </div>
      <div className={`p-2 space-y-3 rounded-lg ${config.color} flex-grow`}>
        {filteredLeads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        <button className="flex items-center space-x-2 p-2 w-full rounded text-gray-400 hover:bg-gray-600/50 transition-colors">
          <PlusIcon className="w-4 h-4" />
          <span>New page</span>
        </button>
      </div>
    </div>
  );
};

export default PipelineColumn;
