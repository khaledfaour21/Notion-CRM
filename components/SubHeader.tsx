import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  LeadsIcon,
  TableIcon,
  CalendarIcon,
  MessageSquareIcon,
  CheckSquareIcon,
  FileTextIcon,
  PenSquareIcon,
  LayoutGridIcon,
  Share2Icon,
  FilterIcon,
  SortIcon,
  SearchIcon,
  MoreHorizontalIcon,
  ChevronDownIcon,
  TrendingUpIcon,
} from "./icons";
import NavItem from "./NavItem";
import MoreMenuLocal from "./MoreMenuLocal";

interface SubHeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const NAV_ITEMS = [
  { text: "All Leads", icon: <TableIcon className="w-4 h-4" /> },
  { text: "Follow-ups", icon: <FileTextIcon className="w-4 h-4" /> },
  { text: "Pipeline by Status", icon: <LayoutGridIcon className="w-4 h-4" /> },
  { text: "Calendar", icon: <CalendarIcon className="w-4 h-4" /> },
  { text: "All Messages", icon: <MessageSquareIcon className="w-4 h-4" /> },
  { text: "Tasks Board", icon: <CheckSquareIcon className="w-4 h-4" /> },
  { text: "All Tasks", icon: <TableIcon className="w-4 h-4" /> },
  { text: "Quick Export", icon: <Share2Icon className="w-4 h-4" /> },
  { text: "Lead Info Form", icon: <FileTextIcon className="w-4 h-4" /> },
  { text: "Msg Form", icon: <PenSquareIcon className="w-4 h-4" /> },
  { text: "At a glance", icon: <FileTextIcon className="w-4 h-4" /> },
  { text: "Analytics", icon: <TrendingUpIcon className="w-4 h-4" /> },
];

const TOOLBAR_BUTTONS = [
  { text: "Filter", icon: <FilterIcon className="w-4 h-4" /> },
  { text: "Sort", icon: <SortIcon className="w-4 h-4" /> },
  { text: "Search", icon: <SearchIcon className="w-4 h-4" /> },
  { text: "Settings", icon: <MoreHorizontalIcon className="w-4 h-4" /> },
];

const SubHeader: React.FC<SubHeaderProps> = ({ activeView, setActiveView }) => {
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const visibleCount = useMemo(() => {
    if (width >= 1280) return NAV_ITEMS.length;
    if (width >= 1024) return Math.min(NAV_ITEMS.length, 6);
    if (width >= 768) return Math.min(NAV_ITEMS.length, 5);
    const base = 4;
    const maxHidden = 11;
    const hiddenPossible = Math.max(0, NAV_ITEMS.length - base);
    const hiddenCount = Math.min(hiddenPossible, maxHidden);
    return Math.max(0, NAV_ITEMS.length - hiddenCount);
  }, [width]);

  const visibleItems = NAV_ITEMS.slice(0, visibleCount);
  const hiddenNavItems = NAV_ITEMS.slice(visibleCount);
  const hiddenItems = width < 768 ? [...hiddenNavItems, ...TOOLBAR_BUTTONS] : hiddenNavItems;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };
    if (isMoreOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMoreOpen]);

  const ToolbarButton: React.FC<{
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
  }> = ({ icon, text, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-2 py-1 text-gray-300 rounded hover:bg-gray-700/50 transition-colors"
      title={text}
    >
      {icon}
    </button>
  );

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        {activeView === "All Messages" ? (
          <MessageSquareIcon className="w-6 h-6 text-blue-500" />
        ) : (
          <LeadsIcon className="w-6 h-6 text-red-500" />
        )}
        <h2 className="text-2xl font-bold text-white">
          {activeView === "All Messages" ? "Lead Messages" : "Leads"}
        </h2>
      </div>

      <div className="flex items-center justify-between border-b border-gray-800">
        <div
          className="flex items-center space-x-1 pb-px flex-nowrap overflow-hidden"
          ref={moreMenuRef}
        >
          {visibleItems.map((item) => (
            <NavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              active={activeView === item.text}
              onClick={() => setActiveView(item.text)}
            />
          ))}

          {hiddenItems.length > 0 && (
            <MoreMenuLocal
              hiddenItems={hiddenItems}
              onSelect={(text) => setActiveView(text)}
            />
          )}
        </div>

        {width >= 768 && (
          <div className="flex items-center space-x-2 pr-2">
            {TOOLBAR_BUTTONS.map((btn) => (
              <ToolbarButton key={btn.text} icon={btn.icon} text={btn.text} />
            ))}

            <div className="relative inline-flex rounded-md shadow-sm">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-l-md text-sm font-medium transition-colors"
                title="New"
              >
                New
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-r-md transition-colors flex items-center justify-center"
                title="New options"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
