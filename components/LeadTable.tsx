import React, { useState, useRef, useEffect } from "react";
import { Lead, ContactChannel, Status, Task } from "../types";
import { LEAD_TABLE_COLUMNS } from "../constants";
import { PlusIcon, InfoIcon, GripVerticalIcon } from "./icons";
import Cell from "./cell";

interface LeadTableProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  onSelectLead: (lead: Lead) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  setLeads,
  onSelectLead,
  tasks,
  setTasks,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(leads.filter((l) => l.selected).map((l) => l.id))
  );
  const [activePopover, setActivePopover] = useState<{ leadId: number; columnId: string } | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // مزامنة تمرير شريط التمرير مع الجدول
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
  }, []);

  const addRow = (afterId?: number) => {
    const newLead: Lead = {
      id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
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
    if (afterId !== undefined) {
      const index = leads.findIndex(l => l.id === afterId);
      const newLeads = [...leads];
      newLeads.splice(index + 1, 0, newLead);
      setLeads(newLeads);
    } else {
      setLeads([...leads, newLead]);
    }
  };

  const handleSelectChange = (leadId: number, checked: boolean) => {
    setSelectedIds(curr => {
      const newSet = new Set(curr);
      if (checked) newSet.add(leadId);
      else newSet.delete(leadId);
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(leads.map(l => l.id)));
    else setSelectedIds(new Set());
  };

  const columnWidths: Record<string, string> = {
    name: "minmax(250px, 1.5fr)",
    aiExport: "100px",
    status: "180px",
    company: "minmax(150px, 1fr)",
    contactChannel: "150px",
    conversationSummary: "minmax(200px, 1fr)",
    lastContactDate: "180px",
    linkedinUrl: "minmax(200px, 1fr)",
    messages: "minmax(200px, 1fr)",
    nextFollowUpDate: "180px",
    nextStep: "minmax(200px, 1fr)",
    priority: "120px",
    roleTitle: "150px",
    tags: "minmax(150px, 1fr)",
    tasks: "minmax(150px, 1fr)",
  };

  const gridTemplateColumns = `80px ${LEAD_TABLE_COLUMNS.map(c => columnWidths[c.id] || "minmax(150px, 1fr)").join(" ")}`;
  const isAllSelected = selectedIds.size > 0 && selectedIds.size === leads.length;

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col relative pb-16">
      {/* القسم العلوي (العنوان وأزرار ... ) */}
      <div className="p-4 z-10 bg-[#181818] shadow-md">
        <h1 className="text-white text-xl font-bold mb-2">Leads</h1>
      </div>

      {/* الجدول يأخذ المساحة المتبقية ويظهر فقط شريط تمرير أفقي خارجي */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden border border-gray-800 rounded-lg"
        ref={tableContainerRef}
      >
        <div className="min-w-max">
          {/* Table Header */}
          <div
            className="grid bg-[#202020] border-b border-gray-700 sticky top-0 z-10"
            style={{ gridTemplateColumns }}
          >
            <div className="p-2.5 border-r border-gray-700 flex justify-center items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500"
              />
            </div>
            {LEAD_TABLE_COLUMNS.map(col => (
              <div key={col.id} className="flex items-center space-x-2 p-2.5 font-medium text-gray-400 border-r border-gray-700 last:border-r-0">
                {col.icon}
                <span>{col.title}</span>
                <InfoIcon className="w-3 h-3 text-gray-500" />
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div>
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="grid items-center border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20 group relative"
                style={{ gridTemplateColumns }}
              >
                <div className="flex items-center justify-center p-2.5 border-r border-gray-700 h-full">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(lead.id)}
                    onChange={(e) => handleSelectChange(lead.id, e.target.checked)}
                    className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500 ml-3 z-10"
                  />
                  <div className="flex items-center ml-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => addRow(lead.id)} className="p-1 rounded hover:bg-gray-700"><PlusIcon className="w-4 h-4 text-gray-400" /></button>
                    <div draggable onDragStart={(e) => { }} className="p-1 rounded hover:bg-gray-700 cursor-grab"><GripVerticalIcon className="w-4 h-4 text-gray-400" /></div>
                  </div>
                </div>
                {LEAD_TABLE_COLUMNS.map(col => (
                  <Cell
                    key={`${lead.id}-${col.id}`}
                    lead={lead}
                    columnId={col.id as keyof Lead}
                    onChange={() => {}}
                    onSelectLead={onSelectLead}
                    activePopover={activePopover}
                    setActivePopover={setActivePopover}
                    tableContainerRef={tableContainerRef}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div onClick={() => addRow()} className="flex items-center space-x-2 p-2.5 cursor-pointer text-gray-400 hover:bg-gray-800/40">
            <PlusIcon className="w-4 h-4" />
            <span>New page</span>
          </div>
        </div>
      </div>

      {/* شريط التمرير الأفقي الثابت دائماً */}
      <div
        ref={scrollbarRef}
        className="fixed left-0 bottom-0 w-full h-6 bg-[#181818] overflow-x-auto z-50"
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{ width: tableContainerRef.current?.scrollWidth || 1200, height: 6 }}/>
      </div>
    </div>
  );
};

export default LeadTable;
