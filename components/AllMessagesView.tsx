import React, { useState } from "react";
import { Lead, MessageRow } from "../types";
import {
  FileTextIcon,
  LeadsIcon,
  CalendarIcon,
  MessageSquareIcon,
  PlusIcon,
} from "./icons";
import {
  MessageTableHeader,
  MessageRowComponent,
  AddMessageRowButton,
} from "./MessageComponents";

const initialMessages: MessageRow[] = [
  {
    id: 1,
    title: "hi",
    leadName: "omar",
    date: "",
    direction: null,
    channel: null,
    content: "“I want you to design a Notion v",
  },
  {
    id: 2,
    title: "",
    leadName: "omar",
    date: "",
    direction: null,
    channel: null,
    content: "",
  },
];

interface AllMessagesViewProps {
  leads: Lead[];
  onSelectMessage: (message: MessageRow) => void;
}

const AllMessagesView: React.FC<AllMessagesViewProps> = ({
  leads,
  onSelectMessage,
}) => {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);

  const addRow = () => {
    const newRow: MessageRow = {
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      title: "",
      leadName: "",
      date: "",
      direction: null,
      channel: null,
      content: "",
    };
    setMessages([...messages, newRow]);
  };

  const columns = [
    {
      id: "title",
      title: "Message",
      icon: <FileTextIcon className="w-4 h-4" />,
    },
    { id: "leadName", title: "Lead", icon: <LeadsIcon className="w-4 h-4" /> },
    { id: "date", title: "Date", icon: <CalendarIcon className="w-4 h-4" /> },
    {
      id: "direction",
      title: "Direction",
      icon: <FileTextIcon className="w-4 h-4" />,
    },
    {
      id: "channel",
      title: "Channel",
      icon: <MessageSquareIcon className="w-4 h-4" />,
    },
    {
      id: "content",
      title: "Message Content",
      icon: <FileTextIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="text-sm">
      <div className="border border-gray-800 rounded-lg overflow-x-auto">
        <div className="min-w-max">
          <MessageTableHeader columns={columns} />
          <div>
            {messages.map((message) => (
              <MessageRowComponent
                key={message.id}
                message={message}
                onSelectMessage={onSelectMessage}
              />
            ))}
          </div>
          <AddMessageRowButton onClick={addRow} />
        </div>
      </div>
    </div>
  );
};

export default AllMessagesView;
