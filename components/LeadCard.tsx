import React from "react";
import { Lead } from "../types";

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("leadId", lead.id.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-[#2F2F2F] p-3 rounded-md border border-gray-700 cursor-grab active:cursor-grabbing shadow-sm"
    >
      <p className="font-medium text-white">{lead.name || "New page"}</p>
      {lead.company && <p className="text-sm text-gray-400">{lead.company}</p>}
    </div>
  );
};

export default LeadCard;
