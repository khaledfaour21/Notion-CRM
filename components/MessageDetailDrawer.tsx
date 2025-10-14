import React from "react";
import { MessageRow } from "../types";
import {
  ChevronsLeftRightIcon,
  Maximize2Icon,
  MoreHorizontalIcon,
  StarIcon,
  FileTextIcon,
  LeadsIcon,
  CalendarIcon,
  CircleIcon,
  MessageSquareIcon,
  InfoIcon,
} from "./icons";

interface MessageDetailDrawerProps {
  message: MessageRow | null;
  isOpen: boolean;
  onClose: () => void;
}

const MessageDetailDrawer: React.FC<MessageDetailDrawerProps> = ({
  message,
  isOpen,
  onClose,
}) => {
  const drawerClasses = `absolute top-0 right-0 h-full w-[500px] bg-[#1E1E1E] border-l border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out z-20 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`;

  if (!message) {
    return <aside className={drawerClasses}></aside>;
  }

  const properties = [
    {
      icon: <LeadsIcon className="w-4 h-4 text-gray-400" />,
      label: "Lead",
      value: message.leadName || "N/A",
    },
    {
      icon: <CalendarIcon className="w-4 h-4 text-gray-400" />,
      label: "Date",
      value: message.date || "N/A",
    },
    {
      icon: <CircleIcon className="w-4 h-4 text-gray-400" />,
      label: "Direction",
      value: message.direction || "N/A",
    },
    {
      icon: <MessageSquareIcon className="w-4 h-4 text-gray-400" />,
      label: "Channel",
      value: message.channel || "N/A",
    },
  ];

  return (
    <aside className={`${drawerClasses} overflow-y-auto`}>
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-800 text-gray-400 sticky top-0 bg-[#1E1E1E] z-10">
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-800">
            <ChevronsLeftRightIcon className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-800">
            <Maximize2Icon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-2 py-1 text-sm rounded hover:bg-gray-800">
            Share
          </button>
          <button className="p-1 rounded hover:bg-gray-800">
            <StarIcon className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-800">
            <MoreHorizontalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow p-4">
        {/* Message Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">
            {message.title || "Untitled Message"}
          </h2>
        </div>

        {/* Properties List */}
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

        <div className="border-b border-gray-700 my-6"></div>

        {/* Message Content */}
        <div>
          <p className="text-sm text-gray-400 mb-2 flex items-center space-x-2">
            <FileTextIcon className="w-4 h-4" />
            <span>Message Content</span>
          </p>
          <div className="text-gray-300 whitespace-pre-wrap bg-[#2F2F2F] p-4 rounded-md border border-gray-700">
            {message.content || "No content."}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MessageDetailDrawer;
