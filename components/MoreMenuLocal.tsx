import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChevronsUpDownIcon } from "./icons";

interface MoreMenuProps {
  hiddenItems: Array<{ text: string; icon: React.ReactNode }>;
  onSelect: (text: string) => void;
}

const MoreMenuLocal: React.FC<MoreMenuProps> = ({ hiddenItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const toggleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX - 256 }); 
      // طرح عرض القائمة للتموضع من اليمين، 256 px هو عرض القائمة
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) &&
        !(document.getElementById("more-menu-portal")?.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2F2F2F] border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700/70 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={`${hiddenItems.length} more items`}
      >
        <span>{hiddenItems.length} more...</span>
        <ChevronsUpDownIcon className="w-4 h-4 text-gray-400" />
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            id="more-menu-portal"
            className="fixed bg-[#1E1E1E] border border-gray-600 rounded-md shadow-lg p-3 w-64 z-[9999]"
            style={{ top: coords.top, left: coords.left }}
            role="menu"
          >
            {hiddenItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center space-x-3 p-2 text-sm text-gray-300 hover:bg-[#2A2A2A] rounded cursor-pointer"
                role="menuitem"
                onClick={() => {
                  onSelect(item.text);
                  setIsOpen(false);
                }}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default MoreMenuLocal;
