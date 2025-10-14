import React, { useRef, useEffect, useState, useMemo } from "react";
import { Lead, ContactChannel, Priority, Task, TaskStatus } from "../types";
import { STATUS_CONFIG, STATUS_GROUPS } from "../constants";
import {
  FileTextIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  MoreHorizontalIcon,
  GripVerticalIcon,
  PlusIcon,
} from "./icons";
import ContactChannelTag from "./ContactChannelTag";
import PriorityTag from "./PriorityTag";

interface CellProps {
  lead: Lead;
  columnId: keyof Lead;
  onChange: (leadId: number, columnId: keyof Lead, value: any) => void;
  onSelectLead: (lead: Lead) => void;
  activePopover: { leadId: number; columnId: string } | null;
  setActivePopover: (
    popover: { leadId: number; columnId: string } | null
  ) => void;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Cell: React.FC<CellProps> = ({
  lead,
  columnId,
  onChange,
  onSelectLead,
  activePopover,
  setActivePopover,
  tasks,
  setTasks,
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [isEditingTags, setIsEditingTags] = useState(false);

  const commonInputClasses =
    "bg-transparent w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-0.5";
  const commonCellClasses =
    "p-2.5 border-r border-gray-700 last:border-r-0 h-full flex items-center";

  const isPopoverOpen =
    activePopover?.leadId === lead.id && activePopover.columnId === columnId;
  const openPopover = () => setActivePopover({ leadId: lead.id, columnId });
  const closePopover = () => setActivePopover(null);

  const PopoverWrapper: React.FC<{
    children: React.ReactNode;
    className?: string;
  }> = ({ children, className = "" }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        )
          closePopover();
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
      <div
        ref={popoverRef}
        className={`absolute z-30 top-full mt-1 bg-[#282828] border border-gray-700 rounded-md shadow-lg ${className}`}
      >
        {children}
      </div>
    );
  };

  switch (columnId) {
    case "name":
      return (
        <div className={`${commonCellClasses} space-x-2 relative group`}>
          <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            type="text"
            value={lead.name}
            onChange={(e) => onChange(lead.id, "name", e.target.value)}
            className={commonInputClasses}
          />
          <button
            onClick={() => onSelectLead(lead)}
            className="absolute left-24 top-1/2 -translate-y-1/2 bg-[#373737] text-white text-xs px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600 border border-gray-500"
          >
            OPEN
          </button>
        </div>
      );
    case "aiExport":
      return (
        <div className={`${commonCellClasses} justify-center`}>
          <input
            type="checkbox"
            checked={lead.aiExport}
            onChange={(e) => onChange(lead.id, "aiExport", e.target.checked)}
            className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-blue-500 focus:ring-blue-500"
          />
        </div>
      );
    case "contactChannel":
      return (
        <div className={`${commonCellClasses} relative`} ref={cellRef}>
          <button onClick={openPopover} className="w-full text-left">
            <ContactChannelTag type={lead.contactChannel} />
          </button>
          {isPopoverOpen && (
            <PopoverWrapper>
              <div className="p-1 w-48">
                {(Object.values(ContactChannel) as ContactChannel[]).map(
                  (channel) => (
                    <div
                      key={channel}
                      onClick={() => {
                        onChange(lead.id, "contactChannel", channel);
                        closePopover();
                      }}
                      className="flex items-center p-2 rounded hover:bg-gray-700/50 cursor-pointer"
                    >
                      <ContactChannelTag type={channel} />
                    </div>
                  )
                )}
              </div>
            </PopoverWrapper>
          )}
        </div>
      );
    case "status":
      const statusConfig = STATUS_CONFIG[lead.status];
      return (
        <div className={`${commonCellClasses} relative`} ref={cellRef}>
          <button onClick={openPopover} className="w-full text-left">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5 ${statusConfig.color} ${statusConfig.textColor}`}
            >
              {React.cloneElement(statusConfig.icon, { className: "w-3 h-3" })}
              {lead.status}
            </span>
          </button>
          {isPopoverOpen && (
            <PopoverWrapper>
              <div className="p-2 w-72">
                <div className="relative mb-2">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800/50 w-full rounded border-none pl-8 py-1 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {Object.entries(STATUS_GROUPS).map(([groupName, statuses]) => (
                  <div key={groupName} className="mb-2">
                    <p className="text-xs text-gray-500 px-1 mb-1">
                      {groupName}
                    </p>
                    {statuses.map((status) => {
                      const config = STATUS_CONFIG[status];
                      return (
                        <div
                          key={status}
                          onClick={() => {
                            onChange(lead.id, "status", status);
                            closePopover();
                          }}
                          className="flex items-center space-x-2 p-1 rounded hover:bg-gray-700/50 cursor-pointer"
                        >
                          {React.cloneElement(config.icon, {
                            className: `w-3 h-3 ${config.textColor.replace(
                              "text-gray-300",
                              ""
                            )}`,
                          })}
                          <span className={config.textColor}>{status}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </PopoverWrapper>
          )}
        </div>
      );
    case "priority":
      return (
        <div className={`${commonCellClasses} relative`} ref={cellRef}>
          <button onClick={openPopover} className="w-full text-left">
            <PriorityTag type={lead.priority} />
          </button>
          {isPopoverOpen && (
            <PopoverWrapper>
              <div className="p-1 w-48">
                {(Object.values(Priority) as Priority[]).map((p) => (
                  <div
                    key={p}
                    onClick={() => {
                      onChange(lead.id, "priority", p);
                      closePopover();
                    }}
                    className="p-2 rounded hover:bg-gray-700/50 cursor-pointer"
                  >
                    <PriorityTag type={p} />
                  </div>
                ))}
                <div
                  onClick={() => {
                    onChange(lead.id, "priority", undefined);
                    closePopover();
                  }}
                  className="p-2 rounded hover:bg-gray-700/50 cursor-pointer text-gray-400"
                >
                  Clear
                </div>
              </div>
            </PopoverWrapper>
          )}
        </div>
      );
    case "lastContactDate":
    case "nextFollowUpDate":
      const dateVal = lead[columnId] as string;
      return (
        <div className={`${commonCellClasses} relative`} ref={cellRef}>
          <button
            onClick={openPopover}
            className="w-full text-left text-gray-300 px-1"
          >
            {dateVal ? (
              new Date(dateVal).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            ) : (
              <span className="text-gray-500">Empty</span>
            )}
          </button>
          {isPopoverOpen && (
            <PopoverWrapper>
              <DatePicker
                value={dateVal ? new Date(dateVal) : null}
                onChange={(date) => {
                  onChange(lead.id, columnId, date?.toISOString() || "");
                  closePopover();
                }}
              />
            </PopoverWrapper>
          )}
        </div>
      );
    case "tags":
      const tagsList = lead.tags || [];
      if (isEditingTags) {
        return (
          <div className={commonCellClasses}>
            <input
              type="text"
              defaultValue={tagsList.join(", ")}
              onBlur={(e) => {
                onChange(
                  lead.id,
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                );
                setIsEditingTags(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              autoFocus
              className={commonInputClasses}
            />
          </div>
        );
      }
      return (
        <div
          className={`${commonCellClasses} flex-wrap gap-1 cursor-text`}
          onClick={() => setIsEditingTags(true)}
        >
          {tagsList.length > 0 ? (
            tagsList.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Empty</span>
          )}
        </div>
      );
    case "tasks":
      const linkedTasks = tasks.filter((t) => t.leadId === lead.id);
      return (
        <div className={`${commonCellClasses} relative`} ref={cellRef}>
          <button
            onClick={openPopover}
            className="w-full text-left text-gray-300 px-1 truncate"
          >
            {linkedTasks.length > 0 ? (
              linkedTasks.map((t) => t.title).join(", ")
            ) : (
              <span className="text-gray-500">Empty</span>
            )}
          </button>
          {isPopoverOpen && (
            <PopoverWrapper className="w-80">
              <TasksPopover
                lead={lead}
                allTasks={tasks}
                setAllTasks={setTasks}
                onClose={closePopover}
              />
            </PopoverWrapper>
          )}
        </div>
      );
    default:
      return (
        <div className={commonCellClasses}>
          <input
            type="text"
            value={(lead[columnId as keyof Lead] as string) || ""}
            onChange={(e) =>
              onChange(lead.id, columnId as keyof Lead, e.target.value)
            }
            className={commonInputClasses}
          />
        </div>
      );
  }
};

// تعريف مكون DatePicker
const DatePicker: React.FC<{
  value: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ value, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const calendarGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(new Date(year, month, i));
    }
    return grid;
  }, [currentMonth]);

  const changeMonth = (amount: number) =>
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="p-3 w-72">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div>
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 rounded hover:bg-gray-700"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 rounded hover:bg-gray-700"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-gray-400">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {calendarGrid.map((date, index) => {
          if (!date) return <div key={`empty-${index}`}></div>;
          const isSelected =
            value && date.toDateString() === value.toDateString();
          return (
            <div key={index} className="p-1">
              <button
                onClick={() => onChange(date)}
                className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-700 ${
                  isSelected ? "bg-blue-600 text-white" : ""
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-700 mt-3 pt-2 space-y-2 text-sm">
        {["End date", "Include time", "Remind"].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-gray-400">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// تعريف مكون TasksPopover
const TasksPopover: React.FC<{
  lead: Lead;
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onClose: () => void;
}> = ({ lead, allTasks, setAllTasks, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const linkedTasks = useMemo(
    () => allTasks.filter((task) => task.leadId === lead.id),
    [allTasks, lead.id]
  );
  const unlinkedTasks = useMemo(
    () =>
      allTasks.filter(
        (task) =>
          task.leadId === null &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [allTasks, searchTerm]
  );

  const handleLinkTask = (taskId: number) => {
    setAllTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, leadId: lead.id } : task
      )
    );
  };

  const handleUnlinkTask = (taskId: number) => {
    setAllTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, leadId: null } : task
      )
    );
  };

  const handleCreateTask = () => {
    if (!searchTerm.trim()) return;
    const newId =
      allTasks.length > 0 ? Math.max(...allTasks.map((t) => t.id)) + 1 : 1;
    const newTask: Task = {
      id: newId,
      title: searchTerm,
      status: TaskStatus.ToDo,
      leadId: lead.id,
    };
    setAllTasks([...allTasks, newTask]);
    setSearchTerm("");
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between p-1">
        <input
          type="text"
          placeholder="Link or create a page..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent w-full focus:outline-none text-sm"
        />
        <div className="flex items-center space-x-1 text-sm text-gray-400 flex-shrink-0">
          <span>In</span>
          <CheckCircleIcon className="w-4 h-4 text-green-500" />
          <span className="font-medium text-gray-300">Lead Tasks</span>
        </div>
      </div>

      <div className="mt-1 max-h-60 overflow-y-auto">
        {linkedTasks.length > 0 && (
          <div className="px-1 pt-2">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{linkedTasks.length} selected</span>
              <MoreHorizontalIcon className="w-4 h-4" />
            </div>
            {linkedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-2 p-1 rounded hover:bg-gray-700/50 group"
              >
                <GripVerticalIcon className="w-4 h-4 text-gray-500 cursor-grab" />
                <FileTextIcon className="w-4 h-4 text-gray-400" />
                <span className="flex-grow text-sm">{task.title}</span>
                <button
                  onClick={() => handleUnlinkTask(task.id)}
                  className="w-5 h-5 flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100"
                >
                  &ndash;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="px-1 pt-2">
          <p className="text-xs text-gray-400">Select more</p>
          {unlinkedTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleLinkTask(task.id)}
              className="flex items-center space-x-2 p-1 rounded hover:bg-gray-700/50 cursor-pointer"
            >
              <FileTextIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{task.title}</span>
            </div>
          ))}
          {searchTerm &&
            !unlinkedTasks.some(
              (t) => t.title.toLowerCase() === searchTerm.toLowerCase()
            ) && (
              <div
                onClick={handleCreateTask}
                className="flex items-center space-x-2 p-1 rounded hover:bg-gray-700/50 cursor-pointer"
              >
                <PlusIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-blue-400">
                  Create "{searchTerm}"
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Cell;
