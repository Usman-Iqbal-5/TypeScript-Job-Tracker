import { type job, JobStatus } from "./types/job";

const jobs: job[] = [
  {
    id: crypto.randomUUID(),
    title: "Web Developer",
    company: "FinTech",
    location: "London, UK",
    appliedDate: "2026-08-16",
    url: "www.indeed.com",
    rating: 1,
    notes: "Good match of skills",
    status: JobStatus.applied,
  },
  {
    id: crypto.randomUUID(),
    title: "Software Developer",
    company: "TechFin",
    location: "Birmingham, UK",
    appliedDate: "2026-08-16",
    url: "https://www.google.com/",
    rating: 5,
    notes: "Good match of skills",
    status: JobStatus.offered,
  },
];

export default jobs;
