import React from "react";
import { Direction, ContactChannel, MessageRow } from "../types";
import { InfoIcon, FileTextIcon, PlusIcon } from "./icons";

const directionColors: Record<Direction, string> = {
  [Direction.Sent]: "bg-[#433459] text-[#A686D7]",
  [Direction.Received]: "bg-blue-600/30 text-blue-300",
};

const channelColors: Record<ContactChannel, string> = {
  [ContactChannel.LinkedIn]: "bg-[#59344F] text-[#D786AB]",
  [ContactChannel.Email]: "bg-green-600/30 text-green-300",
  [ContactChannel.Phone]: "bg-yellow-600/30 text-yellow-300",
  [ContactChannel.Other]: "bg-gray-600/30 text-gray-300",
};

export const MessageTableHeader: React.FC<{
  columns: { id: string; title: string; icon: React.ReactNode }[];
}> = ({ columns }) => (
  <div
    className="grid bg-[#202020] border-b border-gray-700"
    style={{
      gridTemplateColumns:
        "minmax(150px, 1fr) minmax(150px, 1fr) 150px 120px 150px minmax(300px, 2fr)",
    }}
  >
    {columns.map((col) => (
      <div
        key={col.id}
        className="flex items-center space-x-2 p-2.5 font-medium text-gray-400 border-r border-gray-700 last:border-r-0"
      >
        {col.icon}
        <span>{col.title}</span>
        <InfoIcon className="w-3 h-3 text-gray-500" />
      </div>
    ))}
  </div>
);

export const DirectionTag: React.FC<{ direction: Direction }> = ({
  direction,
}) => (
  <span
    className={`px-2 py-0.5 rounded-md text-xs font-medium ${directionColors[direction]}`}
  >
    {direction}
  </span>
);

export const ChannelTag: React.FC<{ channel: ContactChannel }> = ({
  channel,
}) => (
  <span
    className={`px-2 py-0.5 rounded-md text-xs font-medium ${channelColors[channel]}`}
  >
    {channel}
  </span>
);

export const MessageRowComponent: React.FC<{
  message: MessageRow;
  onSelectMessage: (msg: MessageRow) => void;
}> = ({ message, onSelectMessage }) => {
  return (
    <div
      className="grid items-center border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20 cursor-pointer"
      style={{
        gridTemplateColumns:
          "minmax(150px, 1fr) minmax(150px, 1fr) 150px 120px 150px minmax(300px, 2fr)",
      }}
      onClick={() => onSelectMessage(message)}
    >
      <div className="p-2.5 border-r border-gray-700 h-full flex items-center space-x-2">
        <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
        <span>{message.title}</span>
      </div>
      <div className="p-2.5 border-r border-gray-700 h-full flex items-center space-x-2">
        <FileTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
        <span>{message.leadName}</span>
      </div>
      <div className="p-2.5 border-r border-gray-700 h-full">
        {message.date}
      </div>
      <div className="p-2.5 border-r border-gray-700 h-full">
        {message.direction && <DirectionTag direction={message.direction} />}
      </div>
      <div className="p-2.5 border-r border-gray-700 h-full">
        {message.channel && <ChannelTag channel={message.channel} />}
      </div>
      <div className="p-2.5 border-r-0 h-full text-gray-400 truncate">
        {message.content}
      </div>
    </div>
  );
};

export const AddMessageRowButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-2 p-2.5 cursor-pointer text-gray-400 hover:bg-gray-800/40"
  >
    <PlusIcon className="w-4 h-4" />
    <span>New page</span>
  </div>
);
