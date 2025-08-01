"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { VerifyConditionForm } from '@/components/VerifyConditionForm';

export default function VerifyConditionPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string || 'TXN78901';

  const handleSubmit = async (formData: {
    selectedCondition: string;
    proofDetails: string;
    selectedFile: File | null;
  }) => {
    console.log('Form submitted:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Navigate back to detail page
    router.push(`/detail/${transactionId}`);
  };

  const handleCancel = () => {
    router.push(`/detail/${transactionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Verify Condition for #{transactionId}
            </h1>
          </div>

          {/* Form Component */}
          <VerifyConditionForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
} 