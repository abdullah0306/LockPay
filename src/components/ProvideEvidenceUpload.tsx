"use client";

import { useState } from 'react';
import { ProvideEvidenceUploadProps } from '@/types/provide-evidence';

export const ProvideEvidenceUpload = ({ onFilesSelected }: ProvideEvidenceUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    onFilesSelected?.(files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    onFilesSelected?.(files);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Evidence</h2>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="evidence-upload"
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <label htmlFor="evidence-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-blue-600 font-medium text-lg">Drag and drop files here, or click to browse</span>
            <p className="text-gray-500 text-sm mt-2">
              Accepted formats: JPG, PNG, PDF (Max 5MB per file)
            </p>
          </div>
        </label>
        
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Selected files:</p>
            <ul className="mt-2 space-y-1">
              {selectedFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-800">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}; 