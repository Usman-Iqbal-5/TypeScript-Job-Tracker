import Chart from "chart.js/auto";
import jobs from "./shared_state";
import getJobStats from "./utils/jobStats";

// STATUS BAR CHART

const statusCanvas =
  document.querySelector<HTMLCanvasElement>("#status-chart")!;

const statusLabels = ["Applied", "Interviewed", "Offered", "Rejected"];

function getStatusCounts(): number[] {
  const stats = getJobStats(jobs);

  return [
    stats.appliedNum,
    stats.interviewedNum,
    stats.offeredNum,
    stats.rejectedNum,
  ];
}

const statusChart = new Chart(statusCanvas, {
  type: "bar",

  data: {
    labels: statusLabels,

    datasets: [
      {
        data: getStatusCounts(),

        backgroundColor: ["#6366f1", "#f59e0b", "#10b981", "#ef4444"],
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Number of Jobs",
        },

        ticks: {
          precision: 0,
        },
      },
    },
  },
});

export function updateStatusChart(): void {
  statusChart.data.datasets[0].data = getStatusCounts();

  statusChart.update();
}

// APPLICATIONS OVER TIME LINE CHART

const applicationsCanvas = document.querySelector<HTMLCanvasElement>(
  "#applications-chart",
)!;

function getApplicationsOverTime(): {
  labels: string[];
  values: number[];
} {
  const applicationsByDate: Record<string, number> = {};

  jobs.forEach((job) => {
    applicationsByDate[job.appliedDate] =
      (applicationsByDate[job.appliedDate] || 0) + 1;
  });

  const sortedDates = Object.keys(applicationsByDate).sort();

  const values = sortedDates.map((date) => applicationsByDate[date]);

  return {
    labels: sortedDates,
    values: values,
  };
}

const applicationData = getApplicationsOverTime();

const applicationsChart = new Chart(applicationsCanvas, {
  type: "line",

  data: {
    labels: applicationData.labels,

    datasets: [
      {
        data: applicationData.values,

        borderColor: "#6366f1",
        backgroundColor: "#6366f1",

        tension: 0.3,
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Number of Jobs",
        },

        ticks: {
          precision: 0,
        },
      },

      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          minRotation: 0,
          maxRotation: 0,
        },
      },
    },
  },
});

export function updateApplicationChart(): void {
  const applicationData = getApplicationsOverTime();

  applicationsChart.data.labels = applicationData.labels;

  applicationsChart.data.datasets[0].data = applicationData.values;

  applicationsChart.update();
}

export function updateDashboardCharts(): void {
  updateStatusChart();
  updateApplicationChart();
}
