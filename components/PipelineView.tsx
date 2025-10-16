import React, { useRef, useState, useEffect } from "react";
import { Lead, Status } from "../types";
import PipelineColumn from "./PipelineColumn";

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
      const syncScroll = () => {
        scrollbar.scrollLeft = container.scrollLeft;
      };
      const syncFakeScroll = () => {
        container.scrollLeft = scrollbar.scrollLeft;
      };
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
      prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
  };

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col relative pb-16">
      {/* العنوان ثابت */}
      <div className="p-4 z-10 bg-[#181818] shadow-md">
        <h1 className="text-white text-xl font-bold mb-2">Pipeline</h1>
      </div>

      {/* الحاوية الأفقية العمومية التي تحتوي الأعمدة مع تمرير أفقي */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden border border-gray-800 rounded-lg"
        ref={containerRef}
      >
        <div className="flex space-x-4 min-w-max py-2">
          {(Object.values(Status) as Status[]).map((status) => (
            <PipelineColumn
              key={status}
              status={status}
              leads={leads}
              onDrop={(e) => handleDrop(status, e)}
            />
          ))}
        </div>
      </div>

      {/* شريط التمرير الأفقي الثابت */}
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
