'use client';

import { useState } from 'react';
import { patientFormSchema, PatientFormValues } from '@/lib/validators';
import { PatientInfo } from '@/types/patient';
import { ClipboardList, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckInFormProps {
  onSubmit: (data: PatientInfo) => void;
}

export default function CheckInForm({ onSubmit }: CheckInFormProps) {
  const [formData, setFormData] = useState<Partial<PatientFormValues>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = patientFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data as PatientInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Patient Check-In</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all",
                errors.firstName ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20"
              )}
              placeholder="Jane"
            />
            {errors.firstName && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all",
                errors.lastName ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20"
              )}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="dateOfBirth" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all",
              errors.dateOfBirth ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20"
            )}
          />
          {errors.dateOfBirth && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dateOfBirth}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="symptoms" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Reason for Visit / Symptoms</label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms || ''}
            onChange={handleChange}
            rows={3}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 transition-all resize-none",
              errors.symptoms ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20"
            )}
            placeholder="Briefly describe why you are here today..."
          />
          {errors.symptoms && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.symptoms}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          Complete Check-In
        </button>
      </form>
    </div>
  );
}
