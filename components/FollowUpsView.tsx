import React, { useState, useRef, useEffect } from "react";
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
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(leads.filter((l) => l.selected).map((l) => l.id))
  );
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(window.innerWidth);

  // تحديث عرض شريط التمرير حسب عرض الجدول
  useEffect(() => {
    const updateWidth = () => {
      if (tableContainerRef.current) {
        setScrollbarWidth(tableContainerRef.current.scrollWidth || window.innerWidth);
      } else {
        setScrollbarWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [leads]);

  // مزامنة التمرير بين الجدول وشريط التمرير السفلي
  useEffect(() => {
    const tableDiv = tableContainerRef.current;
    const scrollbar = scrollbarRef.current;
    if (tableDiv && scrollbar) {
      const syncScroll = () => {
        scrollbar.scrollLeft = tableDiv.scrollLeft;
      };
      const syncFakeScroll = () => {
        tableDiv.scrollLeft = scrollbar.scrollLeft;
      };
      tableDiv.addEventListener("scroll", syncScroll);
      scrollbar.addEventListener("scroll", syncFakeScroll);
      return () => {
        tableDiv.removeEventListener("scroll", syncScroll);
        scrollbar.removeEventListener("scroll", syncFakeScroll);
      };
    }
  }, [scrollbarWidth]);

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

  const gridTemplateColumns = FOLLOW_UPS_TABLE_COLUMNS.map((c) => c.width).join(" ");

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col relative pb-16">
      {/* قسم أعلى الصفحة ثابت */}
      <div className="p-4 z-10 bg-[#181818] shadow-md">
        <h1 className="text-white text-xl font-bold mb-2">Follow-ups</h1>
        {/* اضف مزيدًا من التحكمات أو العناوين إن أردت */}
      </div>

      {/* جدول مع تعطيل تمرير أفقي داخلي */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden border border-gray-800 rounded-lg"
        ref={tableContainerRef}
      >
        <div className="min-w-max">
          {/* رأس الجدول */}
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

          {/* Footer */}
          <div
            onClick={addRow}
            className="flex items-center space-x-2 p-2.5 cursor-pointer text-gray-400 hover:bg-gray-800/40"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New page</span>
          </div>
        </div>
      </div>

      {/* شريط التمرير الأفقي الثابت دائماً */}
      <div
        ref={scrollbarRef}
        className="fixed left-0 bottom-0 w-full h-6 bg-[#181818] overflow-x-auto z-50"
        style={{ pointerEvents: "auto" }}
      >
        <div style={{ width: scrollbarWidth, height: 6 }} />
      </div>
    </div>
  );
};

export default FollowUpsView;
