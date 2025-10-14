import React from "react";
import { Lead, FollowUpStatus, Priority, ContactChannel } from "../types";
import { FileTextIcon } from "./icons";

interface FollowUpsCellProps {
  lead: Lead;
  columnId: keyof Lead;
  onSelectLead: (lead: Lead) => void;
}

const statusColors: Record<FollowUpStatus, string> = {
  [FollowUpStatus.New]: "bg-blue-600/30 text-blue-300",
  [FollowUpStatus.Waiting]: "bg-yellow-600/30 text-yellow-300",
  [FollowUpStatus.Done]: "bg-green-600/30 text-green-300",
};

const priorityColors: Record<Priority, string> = {
  [Priority.Low]: "bg-green-600/30 text-green-300",
  [Priority.Medium]: "bg-yellow-600/30 text-yellow-300",
  [Priority.High]: "bg-red-600/30 text-red-300",
};

const FollowUpsCell: React.FC<FollowUpsCellProps> = ({
  lead,
  columnId,
  onSelectLead,
}) => {
  const commonCellClasses =
    "p-2.5 border-r border-gray-700 last:border-r-0 h-full flex items-center";

  switch (columnId) {
    case "name":
      return (
        <div className={`${commonCellClasses} space-x-2 relative`}>
          <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <span>{lead.name}</span>
          <button
            onClick={() => onSelectLead(lead)}
            className="absolute left-24 top-1/2 -translate-y-1/2 bg-[#373737] text-white text-xs px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600 border border-gray-500"
          >
            OPEN
          </button>
        </div>
      );
    case "followUpStatus":
      return (
        <div className={commonCellClasses}>
          {lead.followUpStatus && (
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                statusColors[lead.followUpStatus]
              }`}
            >
              {lead.followUpStatus}
            </span>
          )}
        </div>
      );
    case "priority":
      return (
        <div className={commonCellClasses}>
          {lead.priority && (
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                priorityColors[lead.priority]
              }`}
            >
              {lead.priority}
            </span>
          )}
        </div>
      );
    case "nextFollowUpDate":
    case "lastContactDate":
      return (
        <div className={commonCellClasses}>
          {lead[columnId]
            ? new Date(lead[columnId] as string).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </div>
      );
    case "selected":
      return (
        <div className={`${commonCellClasses} justify-center`}>
          <input
            type="checkbox"
            checked={lead.selected}
            readOnly
            className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500"
          />
        </div>
      );
    case "contactChannel":
      return (
        <div className={commonCellClasses}>
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#3b3a59] text-[#9b98d7]">
            {lead.contactChannel}
          </span>
        </div>
      );
    default:
      const value = lead[columnId];
      return (
        <div className={`${commonCellClasses} text-gray-400`}>
          {typeof value === "boolean" ? (value ? "Yes" : "No") : value || ""}
        </div>
      );
  }
};

export default FollowUpsCell;
