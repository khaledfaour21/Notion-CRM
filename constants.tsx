import React from "react";
import {
  Lead,
  Status,
  ContactChannel,
  FollowUpStatus,
  Priority,
  Task,
  TaskStatus,
} from "./types";
import {
  CircleIcon,
  BuildingIcon,
  HashIcon,
  MessageSquareIcon,
  FileTextIcon,
  TrendingUpIcon,
  TargetIcon,
  TagIcon,
  CheckSquareIcon,
  StarIcon,
  LeadsIcon,
  TableIcon,
  CalendarIcon,
  LinkIcon,
  CheckCircleIcon,
} from "./components/icons";

// STATUS CONFIG
export const STATUS_CONFIG: Record<
  Status,
  {
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    color: string;
    group: "To-do" | "In progress" | "Complete" | "Other";
    textColor: string;
  }
> = {
  [Status.New]: {
    icon: <CircleIcon className="w-3 h-3 text-blue-400" />,
    color: "bg-transparent",
    group: "To-do",
    textColor: "text-gray-300",
  },
  [Status.Researching]: {
    icon: <CircleIcon className="w-3 h-3 text-orange-400" />,
    color: "bg-transparent",
    group: "To-do",
    textColor: "text-gray-300",
  },
  [Status.Contacted]: {
    icon: <CircleIcon className="w-3 h-3 text-blue-400" />,
    color: "bg-transparent",
    group: "In progress",
    textColor: "text-gray-300",
  },
  [Status.Replied]: {
    icon: <CircleIcon className="w-3 h-3 text-yellow-400" />,
    color: "bg-transparent",
    group: "In progress",
    textColor: "text-gray-300",
  },
  [Status.DemoScheduled]: {
    icon: <CircleIcon className="w-3 h-3 text-purple-400" />,
    color: "bg-transparent",
    group: "In progress",
    textColor: "text-gray-300",
  },
  [Status.ClosedWon]: {
    icon: <CircleIcon className="w-3 h-3 text-green-400" />,
    color: "bg-transparent",
    group: "Complete",
    textColor: "text-gray-300",
  },
  [Status.ClosedLost]: {
    icon: <CircleIcon className="w-3 h-3 text-red-400" />,
    color: "bg-transparent",
    group: "Complete",
    textColor: "text-gray-300",
  },
  [Status.Disqualified]: {
    icon: <CircleIcon className="w-3 h-3 text-stone-500" />,
    color: "bg-transparent",
    group: "Complete",
    textColor: "text-gray-300",
  },
  [Status.NoStatus]: {
    icon: <CircleIcon className="w-3 h-3 text-gray-500" />,
    color: "bg-gray-800/50",
    group: "Other",
    textColor: "text-gray-400",
  },
};

export const STATUS_GROUPS: { [key: string]: Status[] } = {
  "To-do": [Status.New, Status.Researching],
  "In progress": [Status.Contacted, Status.Replied, Status.DemoScheduled],
  Complete: [Status.ClosedWon, Status.ClosedLost, Status.Disqualified],
};

// PIPELINE STATUS CONFIG
export const PIPELINE_STATUS_CONFIG: Record<
  Status,
  { icon: React.ReactElement; color: string; textColor: string }
> = {
  [Status.New]: {
    icon: <CircleIcon className="w-4 h-4 text-blue-400" />,
    color: "bg-blue-800/30",
    textColor: "text-blue-400",
  },
  [Status.Researching]: {
    icon: <CircleIcon className="w-4 h-4 text-orange-500" />,
    color: "bg-orange-800/30",
    textColor: "text-orange-400",
  },
  [Status.Contacted]: {
    icon: <CircleIcon className="w-4 h-4 text-blue-400" />,
    color: "bg-blue-800/30",
    textColor: "text-blue-500",
  },
  [Status.Replied]: {
    icon: <CircleIcon className="w-4 h-4 text-yellow-500" />,
    color: "bg-yellow-800/30",
    textColor: "text-yellow-400",
  },
  [Status.DemoScheduled]: {
    icon: <CircleIcon className="w-4 h-4 text-purple-500" />,
    color: "bg-purple-800/30",
    textColor: "text-purple-400",
  },
  [Status.ClosedWon]: {
    icon: <CircleIcon className="w-4 h-4 text-green-500" />,
    color: "bg-green-800/30",
    textColor: "text-green-400",
  },
  [Status.ClosedLost]: {
    icon: <CircleIcon className="w-4 h-4 text-red-500" />,
    color: "bg-red-800/30",
    textColor: "text-red-400",
  },
  [Status.Disqualified]: {
    icon: <CircleIcon className="w-4 h-4 text-gray-500" />,
    color: "bg-gray-800/50",
    textColor: "text-gray-400",
  },
  [Status.NoStatus]: {
    icon: <CircleIcon className="w-4 h-4 text-gray-500" />,
    color: "bg-gray-800/50",
    textColor: "text-gray-400",
  },
};

// TASK STATUS CONFIG
export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  {
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    color: string;
    textColor: string;
  }
> = {
  [TaskStatus.Done]: {
    icon: <CheckCircleIcon />,
    color: "bg-gray-700/20",
    textColor: "text-gray-400",
  },
  [TaskStatus.InProgress]: {
    icon: <CircleIcon />,
    color: "bg-blue-600/10",
    textColor: "text-blue-400",
  },
  [TaskStatus.ToDo]: {
    icon: <CircleIcon />,
    color: "bg-gray-700/10",
    textColor: "text-gray-400",
  },
  [TaskStatus.Complete]: {
    icon: <CheckCircleIcon />,
    color: "bg-green-800/20",
    textColor: "text-green-400",
  },
  [TaskStatus.NoStatus]: {
    icon: <CircleIcon />,
    color: "bg-gray-600/20",
    textColor: "text-gray-400",
  },
};

// LEAD TABLE COLUMNS
export const LEAD_TABLE_COLUMNS = [
  { id: "name", title: "Name", icon: <FileTextIcon className="w-4 h-4" /> },
  {
    id: "aiExport",
    title: "AI Export",
    icon: <StarIcon className="w-4 h-4" />,
  },
  {
    id: "company",
    title: "Company",
    icon: <BuildingIcon className="w-4 h-4" />,
  },
  {
    id: "contactChannel",
    title: "Contact Channel",
    icon: <MessageSquareIcon className="w-4 h-4" />,
  },
  {
    id: "conversationSummary",
    title: "Conversation Summary",
    icon: <MessageSquareIcon className="w-4 h-4" />,
  },
  {
    id: "lastContactDate",
    title: "Last Contact Date",
    icon: <CalendarIcon className="w-4 h-4" />,
  },
  {
    id: "linkedinUrl",
    title: "Linkedin",
    icon: <LinkIcon className="w-4 h-4" />,
  },
  {
    id: "messages",
    title: "Messages",
    icon: <MessageSquareIcon className="w-4 h-4" />,
  },
  {
    id: "nextFollowUpDate",
    title: "Next Follow-up Date",
    icon: <CalendarIcon className="w-4 h-4" />,
  },
  {
    id: "nextStep",
    title: "Next Step (inline)",
    icon: <TrendingUpIcon className="w-4 h-4" />,
  },

  { id: "priority", title: "Priority", icon: <StarIcon className="w-4 h-4" /> },
  {
    id: "roleTitle",
    title: "Role/Title",
    icon: <LeadsIcon className="w-4 h-4" />,
  },
  { id: "status", title: "Status", icon: <CircleIcon className="w-4 h-4" /> },
  { id: "tags", title: "Tags", icon: <TagIcon className="w-4 h-4" /> },
  {
    id: "tasks",
    title: "Tasks",
    icon: <CheckSquareIcon className="w-4 h-4" />,
  },
];

// FOLLOW-UPS TABLE COLUMNS
export const FOLLOW_UPS_TABLE_COLUMNS = [
  {
    id: "name",
    title: "Name",
    icon: <FileTextIcon className="w-4 h-4" />,
    width: "minmax(250px, 1.5fr)",
  },
  {
    id: "followUpStatus",
    title: "Status",
    icon: <CircleIcon className="w-4 h-4" />,
    width: "120px",
  },
  {
    id: "priority",
    title: "Priority",
    icon: <StarIcon className="w-4 h-4" />,
    width: "120px",
  },
  {
    id: "nextFollowUpDate",
    title: "Next Follow-up Date",
    icon: <CalendarIcon className="w-4 h-4" />,
    width: "180px",
  },
  {
    id: "lastContactDate",
    title: "Last Contact Date",
    icon: <CalendarIcon className="w-4 h-4" />,
    width: "180px",
  },
  {
    id: "conversationSummary",
    title: "Conversation Summary",
    icon: <MessageSquareIcon className="w-4 h-4" />,
    width: "minmax(200px, 1fr)",
  },
  {
    id: "nextStep",
    title: "Next Step (inline)",
    icon: <TrendingUpIcon className="w-4 h-4" />,
    width: "minmax(200px, 1fr)",
  },
  {
    id: "aiExport",
    title: "AI Export",
    icon: <StarIcon className="w-4 h-4" />,
    width: "100px",
  },
  {
    id: "selected",
    title: "Select",
    icon: <CheckSquareIcon className="w-4 h-4" />,
    width: "50px",
  },
  {
    id: "linkedinUrl",
    title: "Linkedin",
    icon: <LinkIcon className="w-4 h-4" />,
    width: "minmax(200px, 1fr)",
  },
  {
    id: "company",
    title: "Company",
    icon: <BuildingIcon className="w-4 h-4" />,
    width: "minmax(150px, 1fr)",
  },
  {
    id: "contactChannel",
    title: "Contact Channel",
    icon: <HashIcon className="w-4 h-4" />,
    width: "150px",
  },
  {
    id: "messages",
    title: "Messages",
    icon: <MessageSquareIcon className="w-4 h-4" />,
    width: "minmax(200px, 1fr)",
  },
  {
    id: "roleTitle",
    title: "Role/Title",
    icon: <LeadsIcon className="w-4 h-4" />,
    width: "150px",
  },
  {
    id: "tags",
    title: "Tags",
    icon: <TagIcon className="w-4 h-4" />,
    width: "minmax(150px, 1fr)",
  },
  {
    id: "tasks",
    title: "Tasks",
    icon: <CheckSquareIcon className="w-4 h-4" />,
    width: "minmax(150px, 1fr)",
  },
];

// TASK TABLE COLUMNS
export const TASK_TABLE_COLUMNS = [
  { id: "title", title: "Task", icon: <FileTextIcon className="w-4 h-4" /> },
  { id: "leadId", title: "Lead", icon: <LeadsIcon className="w-4 h-4" /> },
  { id: "status", title: "Status", icon: <CircleIcon className="w-4 h-4" /> },
  { id: "dueDate", title: "Due", icon: <CalendarIcon className="w-4 h-4" /> },
  { id: "priority", title: "Priority", icon: <StarIcon className="w-4 h-4" /> },
  { id: "notes", title: "Notes", icon: <FileTextIcon className="w-4 h-4" /> },
];

// بيانات تجريبية
export const LEADS_DATA: Lead[] = [
  {
    id: 1,
    name: "omar",
    aiExport: false,
    company: "test",
    contactChannel: ContactChannel.LinkedIn,
    conversationSummary: "",
    lastContactDate: "2025-09-23T12:00:00Z",
    linkedinUrl: "wsosmw.cpm",
    messages: "hi\nNew page",
    nextFollowUpDate: "2025-10-01T12:00:00Z",
    status: Status.Contacted,
    selected: false,
    tasks: "test",
    followUpStatus: FollowUpStatus.New,
    priority: Priority.Low,
    roleTitle: "",
    tags: ["test"],
    nextStep: "",
  },
  {
    id: 2,
    name: "Miro",
    aiExport: false,
    company: "Miro",
    contactChannel: ContactChannel.Email,
    conversationSummary: "",
    lastContactDate: "2025-10-20T12:00:00Z",
    linkedinUrl: "",
    messages: "Inbound interest",
    nextFollowUpDate: "",
    status: Status.New,
    selected: true,
  },
  {
    id: 3,
    name: "Vercel",
    aiExport: false,
    company: "Vercel Inc.",
    contactChannel: ContactChannel.LinkedIn,
    conversationSummary: "",
    lastContactDate: "2025-09-28T12:00:00Z",
    linkedinUrl: "",
    messages: "",
    nextFollowUpDate: "",
    status: Status.DemoScheduled,
    selected: false,
  },
  {
    id: 4,
    name: "Notion",
    aiExport: true,
    company: "Notion Labs",
    contactChannel: ContactChannel.Email,
    conversationSummary: "",
    lastContactDate: "2025-10-05T12:00:00Z",
    linkedinUrl: "",
    messages: "Discussed pricing",
    nextFollowUpDate: "",
    status: Status.Replied,
    selected: false,
  },
  {
    id: 5,
    name: "Loom",
    aiExport: false,
    company: "Loom",
    contactChannel: ContactChannel.LinkedIn,
    conversationSummary: "",
    lastContactDate: "2025-10-12T12:00:00Z",
    linkedinUrl: "",
    messages: "",
    nextFollowUpDate: "",
    status: Status.NoStatus,
    selected: false,
  },
];

export const PRIORITY_CONFIG: Record<Priority, { color: string }> = {
  [Priority.Low]: { color: "bg-green-600/30 text-green-300" },
  [Priority.Medium]: { color: "bg-yellow-600/30 text-yellow-300" },
  [Priority.High]: { color: "bg-red-600/30 text-red-300" },
};

export const TASKS_DATA: Task[] = [
  {
    id: 1,
    title: "react",
    status: TaskStatus.Done,
    leadId: 1,
    priority: Priority.Low,
    dueDate: "2025-10-01T12:00:00Z",
    notes: "not1",
  },
  {
    id: 2,
    title: "test",
    status: TaskStatus.InProgress,
    leadId: 1,
    priority: Priority.High,
    dueDate: "2025-10-09T12:00:00Z",
    notes: "de",
  },
  {
    id: 3,
    title: "ai",
    status: TaskStatus.ToDo,
    leadId: null,
    priority: Priority.High,
    dueDate: "",
    notes: "",
  },
  {
    id: 4,
    title: "make",
    status: TaskStatus.ToDo,
    leadId: null,
    priority: Priority.Medium,
    dueDate: "",
    notes: "cd",
  },
];
