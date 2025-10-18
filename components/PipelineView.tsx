import React, { useRef, useState, useEffect } from "react";
import { Lead, Status } from "../types";
import { PIPELINE_STATUS_CONFIG } from "../constants";
import { PlusIcon } from "./icons";
import LeadCard from "./LeadCard";

interface PipelineViewProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const PipelineView: React.FC<PipelineViewProps> = ({ leads, setLeads }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setScrollbarWidth(containerRef.current.scrollWidth || window.innerWidth);
      } else {
        setScrollbarWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [leads]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollbar = scrollbarRef.current;
    if (container && scrollbar) {
      const syncScroll = () => (scrollbar.scrollLeft = container.scrollLeft);
      const syncFakeScroll = () => (container.scrollLeft = scrollbar.scrollLeft);
      container.addEventListener("scroll", syncScroll);
      scrollbar.addEventListener("scroll", syncFakeScroll);
      return () => {
        container.removeEventListener("scroll", syncScroll);
        scrollbar.removeEventListener("scroll", syncFakeScroll);
      };
    }
  }, [scrollbarWidth]);

  const handleDrop = (newStatus: Status, e: React.DragEvent<HTMLDivElement>) => {
    const leadId = parseInt(e.dataTransfer.getData("leadId"), 10);
    if (!leadId) return;

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    e.currentTarget.classList.remove("bg-gray-700/50");
  };

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col relative pb-16">
      <div className="p-4 z-10 bg-[#181818] shadow-md">
        <h1 className="text-white text-xl font-bold mb-2">Pipeline</h1>
      </div>

      <div
        className="flex-1 overflow-y-hidden overflow-x-auto pb-4 h-full border border-gray-800 rounded-lg"
        ref={containerRef}
      >
        <div className="flex space-x-4 min-w-max py-2 px-4">
          {(Object.values(Status) as Status[]).map((status) => {
            const config = PIPELINE_STATUS_CONFIG[status];
            const filteredLeads = leads.filter((l) => l.status === status);

            return (
              <div
                key={status}
                className="flex-shrink-0 w-72 flex flex-col"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(status, e)}
              >
                {/* Header */}
                <div className="flex items-center space-x-2 p-2">
               {React.cloneElement(config.icon)}

                  <span className={`font-medium ${config.textColor}`}>
                    {status}
                  </span>
                  <span className="text-sm text-gray-400">
                    {filteredLeads.length}
                  </span>
                </div>

                {/* Cards */}
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
          })}
        </div>
      </div>

      {/* Scrollbar fixed bottom */}
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

export default PipelineView;
