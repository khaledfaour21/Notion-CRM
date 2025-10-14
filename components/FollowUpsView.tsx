import React from "react";
import { ContactChannel, Lead, Status } from "../types";
import { FOLLOW_UPS_TABLE_COLUMNS } from "../constants";
import { PlusIcon } from "./icons";
import FollowUpsHeader from "./FollowUpsHeader";
import FollowUpsCell from "./FollowUpsCell";

interface FollowUpsViewProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  onSelectLead: (lead: Lead) => void;
}

const FollowUpsView: React.FC<FollowUpsViewProps> = ({
  leads,
  setLeads,
  onSelectLead,
}) => {
  const addRow = () => {
    const newLead: Lead = {
      id: leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1,
      name: "",
      aiExport: false,
      company: "",
      contactChannel: ContactChannel.LinkedIn,
      conversationSummary: "",
      lastContactDate: "",
      linkedinUrl: "",
      messages: "",
      nextFollowUpDate: "",
      status: Status.NoStatus,
      selected: false,
    };
    setLeads([...leads, newLead]);
  };

  const gridTemplateColumns = FOLLOW_UPS_TABLE_COLUMNS.map((c) => c.width).join(
    " "
  );

  return (
    <div className="text-sm">
      <div className="border border-gray-800 rounded-lg overflow-x-auto">
        <div className="min-w-max">
          <FollowUpsHeader gridTemplateColumns={gridTemplateColumns} />
          <div>
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="grid items-center border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20 group"
                style={{ gridTemplateColumns }}
              >
                {FOLLOW_UPS_TABLE_COLUMNS.map((col) => (
                  <FollowUpsCell
                    key={`${lead.id}-${col.id}`}
                    lead={lead}
                    columnId={col.id as keyof Lead}
                    onSelectLead={onSelectLead}
                  />
                ))}
              </div>
            ))}
          </div>
          <div
            onClick={addRow}
            className="flex items-center space-x-2 p-2.5 cursor-pointer text-gray-400 hover:bg-gray-800/40 sticky left-0"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsView;
