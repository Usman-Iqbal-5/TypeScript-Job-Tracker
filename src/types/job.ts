export const enum JobStatus {
  applied = "applied",
  interviewed = "interviewed",
  offered = "offered",
  rejected = "rejected",
}

export interface job {
  id: string;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  interviewedDate?: string;
  offerDate?: string;
  rejectedDate?: string;
  url: string;
  rating: number;
  notes?: string;
  status: JobStatus;
}

