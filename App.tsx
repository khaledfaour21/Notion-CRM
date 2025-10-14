import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import LeadTable from "./components/LeadTable";
import PipelineView from "./components/PipelineView";
import CalendarView from "./components/CalendarView";
import AllMessagesView from "./components/AllMessagesView";
import FollowUpsView from "./components/FollowUpsView";
import TasksBoardView from "./components/TasksBoardView";
import AllTasksView from "./components/AllTasksView";
import LeadDetailDrawer from "./components/LeadDetailDrawer";
import MessageDetailDrawer from "./components/MessageDetailDrawer";
import { Lead, MessageRow, Task } from "./types";
import { LEADS_DATA, TASKS_DATA } from "./constants";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("All Leads");
  const [leads, setLeads] = useState<Lead[]>(LEADS_DATA);
  const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageRow | null>(
    null
  );
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState<boolean>(false);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] =
    useState<boolean>(false);

  const handleSelectLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadDrawerOpen(true);
    setIsMessageDrawerOpen(false); // Close message drawer if open
  }, []);

  const handleSelectMessage = useCallback((message: MessageRow) => {
    setSelectedMessage(message);
    setIsMessageDrawerOpen(true);
    setIsLeadDrawerOpen(false); // Close lead drawer if open
  }, []);

  const handleCloseDrawers = () => {
    setIsLeadDrawerOpen(false);
    setIsMessageDrawerOpen(false);
    // Note: we don't clear selectedLead/Message so the drawer has content while closing
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "All Leads":
        return (
          <LeadTable
            leads={leads}
            setLeads={setLeads}
            onSelectLead={handleSelectLead}
            tasks={tasks}
            setTasks={setTasks}
          />
        );
      case "Pipeline by Status":
        return <PipelineView leads={leads} setLeads={setLeads} />;
      case "Calendar":
        return <CalendarView leads={leads} />;
      case "All Messages":
        return (
          <AllMessagesView
            leads={leads}
            onSelectMessage={handleSelectMessage}
          />
        );
      case "Follow-ups":
        return (
          <FollowUpsView
            leads={leads}
            setLeads={setLeads}
            onSelectLead={handleSelectLead}
          />
        );
      case "Tasks Board":
        return (
          <TasksBoardView tasks={tasks} leads={leads} setTasks={setTasks} />
        );
      case "All Tasks":
        return <AllTasksView tasks={tasks} leads={leads} setTasks={setTasks} />;
      default:
        return (
          <div className="p-8 text-white">
            <h2 className="text-2xl font-bold">{activeView}</h2>
            <p>This view is not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#181818] text-gray-300 min-h-screen font-sans flex">
      {/* Sidebar can be added here if needed */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <div className="flex-1 p-6 overflow-auto">
          <SubHeader activeView={activeView} setActiveView={setActiveView} />
          <div className="mt-6">{renderActiveView()}</div>
        </div>
        <LeadDetailDrawer
          lead={selectedLead}
          isOpen={isLeadDrawerOpen}
          onClose={handleCloseDrawers}
          onUpdateLead={handleUpdateLead}
        />
        <MessageDetailDrawer
          message={selectedMessage}
          isOpen={isMessageDrawerOpen}
          onClose={handleCloseDrawers}
        />
      </main>
    </div>
  );
};

export default App;
