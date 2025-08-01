"use client";

import { useState } from 'react';
import { ProvideEvidenceMessageProps } from '@/types/provide-evidence';

export const ProvideEvidenceMessage = ({ onMessageChange }: ProvideEvidenceMessageProps) => {
  const [message, setMessage] = useState('');
  const maxLength = 1000;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
      onMessageChange?.(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Message</h2>
      
      <div className="relative">
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Provide a detailed explanation or additional context..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={6}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {message.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}; 