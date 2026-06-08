export interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  symptoms: string;
}

export type CheckInState = 'idle' | 'checking-in' | 'completed';
