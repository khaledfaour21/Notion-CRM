export enum Status {
  // To-do
  New = "New",
  Researching = "Researching",
  // In progress
  Contacted = "Contacted",
  Replied = "Replied",
  DemoScheduled = "Demo Scheduled",
  // Complete
  ClosedWon = "Closed Won",
  ClosedLost = "Closed Lost",
  Disqualified = "Disqualified",
  // Default/Fallback
  NoStatus = "No Status",
}

export enum ContactChannel {
  LinkedIn = "LinkedIn",
  Email = "Email",
  Phone = "Phone",
  Other = "Other",
}

export enum Direction {
  Sent = "Sent",
  Received = "Received",
}

export enum FollowUpStatus {
  New = "New",
  Waiting = "Waiting",
  Done = "Done",
}

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum TaskStatus {
  Done = "Done",
  Complete = "Complete",
  InProgress = "In progress",
  ToDo = "To-do",
  NoStatus = "No Status",
}

export interface Lead {
  id: number;
  name: string;
  aiExport: boolean;
  company: string;
  contactChannel: ContactChannel;
  conversationSummary: string;
  lastContactDate: string;
  linkedinUrl: string;
  messages: string;
  nextFollowUpDate: string;
  status: Status;
  selected: boolean;
  tasks?: string;
  followUpStatus?: FollowUpStatus;
  priority?: Priority;
  nextStep?: string;
  roleTitle?: string;
  tags?: string[];
}

export interface MessageRow {
  id: number;
  title: string;
  leadName: string;
  date: string;
  direction: Direction | null;
  channel: ContactChannel | null;
  content: string;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  leadId: number | null;
  priority?: Priority;
  dueDate?: string;
  notes?: string;
}
