'use client';

import { useState } from 'react';
import CheckInForm from '@/components/CheckInForm';
import PatientSummary from '@/components/PatientSummary';
import ChatWindow from '@/components/ChatWindow';
import { PatientInfo, CheckInState } from '@/types/patient';
import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | undefined>(undefined);
  const [checkInState, setCheckInState] = useState<CheckInState>('idle');

  const handleCheckIn = (data: PatientInfo) => {
    setPatientInfo(data);
    setCheckInState('completed');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      <header className="px-8 py-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Activity className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">MansiCare</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          <div className="w-full flex flex-col gap-6">
            <div className="mb-4">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                {checkInState === 'completed' ? 'You are checked in.' : 'Welcome to MansiCare.'}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-md leading-relaxed">
                {checkInState === 'completed' 
                  ? 'Your information has been sent to the front desk. You can chat with our AI assistant while you wait.' 
                  : 'Please complete the short check-in form to let us know you have arrived.'}
              </p>
            </div>

            {checkInState === 'completed' && patientInfo ? (
              <PatientSummary patient={patientInfo} />
            ) : (
              <CheckInForm onSubmit={handleCheckIn} />
            )}
          </div>

          <div className="w-full relative">
            <ChatWindow patientInfo={patientInfo} />
            {checkInState !== 'completed' && (
              <div className="absolute inset-0 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl border border-white/20">
                <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-medium text-sm text-zinc-600 dark:text-zinc-300">Complete check-in to start chatting</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
