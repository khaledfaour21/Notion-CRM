import React from "react";
import { Lead } from "../../types";
import {
  SparklesIcon,
  BuildingIcon,
  HashIcon,
  MessageSquareIcon,
  CalendarIcon,
  LinkIcon,
  FileTextIcon,
  TrendingUpIcon,
  TargetIcon,
  StarIcon,
  LeadsIcon,
  TagIcon,
  CheckSquareIcon,
  InfoIcon,
} from "../icons";

interface PropertyListProps {
  lead: Lead;
  onUpdateLead: (lead: Lead) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ lead, onUpdateLead }) => {
  const properties = [
    {
      icon: <SparklesIcon className="w-4 h-4 text-gray-400" />,
      label: "AI Export",
      value: (
        <input
          type="checkbox"
          checked={lead.aiExport}
          className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 rounded text-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            onUpdateLead({ ...lead, aiExport: e.target.checked })
          }
        />
      ),
    },
    {
      icon: <BuildingIcon className="w-4 h-4 text-gray-400" />,
      label: "Company",
      value: lead.company || "Empty",
    },
    {
      icon: <HashIcon className="w-4 h-4 text-gray-400" />,
      label: "Contact Channel",
      value: (
        <span className="px-2 py-0.5 text-xs rounded bg-[#373737] border border-gray-600">
          {lead.contactChannel}
        </span>
      ),
    },
    {
      icon: <MessageSquareIcon className="w-4 h-4 text-gray-400" />,
      label: "Conversation ...",
      value: "Empty",
    },
    {
      icon: <CalendarIcon className="w-4 h-4 text-gray-400" />,
      label: "Last Contact D...",
      value: lead.lastContactDate
        ? new Date(lead.lastContactDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "Empty",
    },
    {
      icon: <LinkIcon className="w-4 h-4 text-gray-400" />,
      label: "Linkedin",
      value: lead.linkedinUrl || "Empty",
    },
    {
      icon: <FileTextIcon className="w-4 h-4 text-gray-400" />,
      label: "Messages",
      value: (
        <div className="flex flex-col">
          {(lead.messages || "").split("\n").map((msg, i) => (
            <span
              key={i}
              className="hover:bg-gray-700 px-1 rounded cursor-pointer"
            >
              {msg || "New page"}
            </span>
          ))}
        </div>
      ),
    },
    {
      icon: <TrendingUpIcon className="w-4 h-4 text-gray-400" />,
      label: "Next Follow-up...",
      value: "Empty",
    },
    {
      icon: <TargetIcon className="w-4 h-4 text-gray-400" />,
      label: "Next Step (inline)",
      value: "Empty",
    },
    {
      icon: <StarIcon className="w-4 h-4 text-gray-400" />,
      label: "Priority",
      value: "Empty",
    },
    {
      icon: <LeadsIcon className="w-4 h-4 text-gray-400" />,
      label: "Role/Title",
      value: "Empty",
    },
    {
      icon: <HashIcon className="w-4 h-4 text-gray-400" />,
      label: "Status",
      value: "Empty",
    },
    {
      icon: <TagIcon className="w-4 h-4 text-gray-400" />,
      label: "Tags",
      value: "Empty",
    },
    {
      icon: <CheckSquareIcon className="w-4 h-4 text-gray-400" />,
      label: "Tasks",
      value: lead.tasks || "Empty",
    },
  ];

  return (
    <div className="space-y-1 text-sm">
      {properties.map((prop) => (
        <div
          key={prop.label}
          className="flex items-start group hover:bg-gray-800/50 rounded p-1"
        >
          <div className="flex items-center w-40 flex-shrink-0 text-gray-400">
            {prop.icon}
            <span className="ml-2">{prop.label}</span>
            <InfoIcon className="w-3 h-3 ml-auto text-gray-600" />
          </div>
          <div className="ml-4 text-white font-medium break-words w-full">
            {prop.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
