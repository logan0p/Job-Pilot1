export type Job = {
  id: string;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  status: string;
  jobLink?: string;
  notes?: string;
  resume?: string | null;
  appliedDate?: string;
  createdAt?: string;
  updatedAt?: string;
};