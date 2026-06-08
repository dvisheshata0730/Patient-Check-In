import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date of birth.",
  }),
  symptoms: z.string().min(5, { message: "Please briefly describe your symptoms." }),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
