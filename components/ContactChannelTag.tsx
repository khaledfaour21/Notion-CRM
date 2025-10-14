// components/ContactChannelTag.tsx
import React from 'react';

export type ContactChannelType = 'LinkedIn' | 'Email' | 'Phone' | 'Other';

interface ContactChannelTagProps {
  type: ContactChannelType;
}

const COLORS: Record<ContactChannelType, string> = {
  LinkedIn: 'bg-blue-600/30 text-blue-300',
  Email: 'bg-purple-600/30 text-purple-300',
  Phone: 'bg-yellow-600/30 text-yellow-300',
  Other: 'bg-gray-600/30 text-gray-300',
};

const ContactChannelTag: React.FC<ContactChannelTagProps> = ({ type }) => (
  <span className={`px-2 py-0.5 rounded text-xs font-medium ${COLORS[type]}`}>
    {type}
  </span>
);

export default ContactChannelTag;
