import React from "react";
import { Lead, Status } from "../types";
import PipelineColumn from "./PipelineColumn";

interface PipelineViewProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const PipelineView: React.FC<PipelineViewProps> = ({ leads, setLeads }) => {
  const handleDrop = (
    newStatus: Status,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    const leadId = parseInt(e.dataTransfer.getData("leadId"), 10);
    if (!leadId) return;

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 h-full">
      {(Object.values(Status) as Status[]).map((status) => (
        <PipelineColumn
          key={status}
          status={status}
          leads={leads}
          onDrop={(e) => handleDrop(status, e)}
        />
      ))}
    </div>
  );
};

export default PipelineView;
