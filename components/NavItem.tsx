import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active, onClick }) => (
  <div
    className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-t-md cursor-pointer transition-colors ${
      active ? "bg-[#2F2F2F] text-white" : "text-gray-400 hover:bg-gray-800/50"
    }`}
    onClick={onClick}
    title={text}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default NavItem;
