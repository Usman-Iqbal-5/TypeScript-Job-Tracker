import Chart from "chart.js/auto";

import jobs from "./shared_state";
import { JobStatus } from "./types/job";


const statusCanvas = document.querySelector<HTMLCanvasElement>("#status-chart")!;

const appliedCount =
    jobs.filter(job => job.status === JobStatus.applied).length;

const interviewedCount =
    jobs.filter(job => job.status === JobStatus.interviewed).length;

const offeredCount =
    jobs.filter(job => job.status === JobStatus.offered).length;

const rejectedCount =
    jobs.filter(job => job.status === JobStatus.rejected).length;

    const labels = [
    "Applied",
    "Interviewed",
    "Offered",
    "Rejected"
];

const values = [
    appliedCount,
    interviewedCount,
    offeredCount,
    rejectedCount
];

new Chart(statusCanvas, {
    type: "bar",

    data: {
        labels: labels,

        datasets: [
            {
                label: "Jobs",
                data: values,

                backgroundColor: [
                    "#6366f1",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444"
                ]
            }
        ]
    },

    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});