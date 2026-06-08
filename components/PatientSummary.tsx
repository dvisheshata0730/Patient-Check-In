import { PatientInfo } from '@/types/patient';
import { User, Calendar, Activity, CheckCircle2 } from 'lucide-react';

interface PatientSummaryProps {
  patient: PatientInfo;
}

export default function PatientSummary({ patient }: PatientSummaryProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Check-In Complete</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Please verify your details below.</p>
      </div>

      <div className="space-y-4 bg-zinc-50/50 dark:bg-black/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Patient Name</p>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">{patient.firstName} {patient.lastName}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Date of Birth</p>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Reason for Visit</p>
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">{patient.symptoms}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          The AI assistant is available on the right if you need further clarification on your intake.
        </p>
      </div>
    </div>
  );
}
