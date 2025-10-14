import React from "react";
import { Lead } from "../types";
import DrawerHeader from "./LeadDetailDrawerParts/DrawerHeader";
import PropertyList from "./LeadDetailDrawerParts/PropertyList";
import CommentsSection from "./LeadDetailDrawerParts/CommentsSection";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (lead: Lead) => void;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdateLead,
}) => {
  const drawerClasses = `absolute top-0 right-0 h-full w-[500px] bg-[#1E1E1E] border-l border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out z-20 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`;

  if (!lead) return <aside className={drawerClasses}></aside>;

  return (
    <aside className={`${drawerClasses} overflow-y-auto`}>
      <DrawerHeader onClose={onClose} />
      <div className="flex-grow p-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">{lead.name}</h2>
        </div>
        <PropertyList lead={lead} onUpdateLead={onUpdateLead} />
        <CommentsSection />
      </div>
      <div className="p-4 mt-auto text-xs text-gray-500 border-t border-gray-800">
        Press Enter to continue with an empty page, or{" "}
        <a href="#" className="underline hover:text-gray-400">
          create a template
        </a>
        .
      </div>
    </aside>
  );
};

export default LeadDetailDrawer;
