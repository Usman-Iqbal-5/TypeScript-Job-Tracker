import { type job } from "../types/job";

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function exportJobsToCSV(jobs: job[]): void {
  const headers = [
    "Title",
    "Company",
    "Location",
    "Applied Date",
    "Interviewed Date",
    "Offer Date",
    "Rejected Date",
    "URL",
    "Rating",
    "Notes",
    "Status",
  ];

  const rows = jobs.map((job) => [
    job.title,
    job.company,
    job.location,
    formatDate(job.appliedDate),
    job.interviewedDate ? formatDate(job.interviewedDate) : "",
    job.offerDate ? formatDate(job.offerDate) : "",
    job.rejectedDate ? formatDate(job.rejectedDate) : "",
    job.url,
    job.rating,
    job.notes ?? "",
    job.status,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "job-tracker.csv";
  link.click();

  URL.revokeObjectURL(url);
}