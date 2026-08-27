import "../CSS/input.css";
import "./dashboard";

import { type job, JobStatus } from "./types/job";
import jobs from "./shared_state";
import { updateDashboardCharts } from "./dashboard";
import getJobStats from "./utils/jobStats";
import exportJobsToCSV from "./utils/exportJobs";
import { loadJobs, saveJobs } from "./utils/storage";

// Application state
let clickedRating = 0;
let editExistingJobId: string | null = null;
let selectedSideJob: job | null;
let filteredJobs: job[] = jobs;

//Types
type starState = "full" | "outline";

// Global DOM references
const sideMenuIcon = document.querySelector<HTMLDivElement>("#sidemenu-icon")!;
const sideMenuOverlay =
  document.querySelector<HTMLDivElement>("#sidemenu__overlay")!;
const sideMenu = document.querySelector<HTMLDivElement>("#sidemenu")!;
const sideMenuCloseButton =
  document.querySelector<HTMLDivElement>("#sidemenu-close")!;
const exportButton = document.querySelector<HTMLDivElement>("#export-jobs")!;

const kanbanBoard = document.getElementById("kanban-board") as HTMLDivElement;
const interviewedBoard = document.getElementById(
  "interviewed",
) as HTMLDivElement;
const appliedBoard = document.getElementById("applied") as HTMLDivElement;
const offeredBoard = document.getElementById("offered") as HTMLDivElement;
const rejectedBoard = document.getElementById("rejected") as HTMLDivElement;

const interviewedContentArea = document.getElementById(
  "interviewed__content",
) as HTMLDivElement;
const appliedContentArea = document.getElementById(
  "applied__content",
) as HTMLDivElement;
const offeredContentArea = document.getElementById(
  "offered__content",
) as HTMLDivElement;
const rejectedContentArea = document.getElementById(
  "rejected__content",
) as HTMLDivElement;

const applicaitonButton = document.getElementById(
  "add-application-button",
) as HTMLButtonElement;
const modalClose = document.getElementById(
  "modal-close-button",
) as HTMLButtonElement;
const modal = document.getElementById("modal-overlay") as HTMLDivElement;
const closeButton = document.querySelector<HTMLButtonElement>("#modal-close");
const applicationForm =
  document.querySelector<HTMLFormElement>("#application-form");
const headerTitle =
  document.querySelector<HTMLInputElement>("#modal-header h3")!;
const headerText = document.querySelector<HTMLInputElement>("#modal-header p")!;
const title = document.querySelector<HTMLInputElement>("#title")!;
const company = document.querySelector<HTMLInputElement>("#company")!;
const jobLocation = document.querySelector<HTMLInputElement>("#location")!;
const dateApplied = document.querySelector<HTMLInputElement>("#date-applied")!;
const url = document.querySelector<HTMLInputElement>("#url")!;
const dateInterviewed =
  document.querySelector<HTMLInputElement>("#date-interviewed")!;
const dateOffered = document.querySelector<HTMLInputElement>("#date-offered")!;
const dateRejected =
  document.querySelector<HTMLInputElement>("#date-rejected")!;
const jobStatus = document.querySelector<HTMLInputElement>("#job-status")!;
const notes = document.querySelector<HTMLInputElement>("#notes")!;
const submitFormButton = document.querySelector<HTMLButtonElement>(
  "#submit-application",
)!;

const searchBarInput = document.querySelector<HTMLInputElement>(
  "#job-filter #search",
)!;
const ratingFilterInput =
  document.querySelector<HTMLSelectElement>("#rating-filter")!;

const dateFilterInput =
  document.querySelector<HTMLSelectElement>("#date-filter")!;
const sortByInput = document.querySelector<HTMLSelectElement>("#sort-filter")!;
const dashboard = document.getElementById("dashboard") as HTMLDivElement;
// Dashboard stats
const dashboardTotalNum = document.querySelector<HTMLDivElement>(
  "#dashboard__total h2",
)!;
const dashboardRating = document.querySelector<HTMLSpanElement>(
  "#dashboard__total span",
)!;
const dashboardAppliedlNum = document.querySelector<HTMLHeadingElement>(
  "#dashboard__applied h2",
)!;
const dashboardAppliedPercentage = document.querySelector<HTMLSpanElement>(
  "#dashboard__applied span",
)!;
const dashboardInterviewedNum = document.querySelector<HTMLHeadingElement>(
  "#dashboard__interviewed h2",
)!;
const dashboardInterviewedPercentage = document.querySelector<HTMLSpanElement>(
  "#dashboard__interviewed span",
)!;
const dashboardOfferedNum = document.querySelector<HTMLHeadingElement>(
  "#dashboard__offered h2",
)!;
const dashboardOfferedPercentage = document.querySelector<HTMLSpanElement>(
  "#dashboard__offered span",
)!;
const dashboardRejectedNum = document.querySelector<HTMLHeadingElement>(
  "#dashboard__rejected h2",
)!;
const dashboardRejectedPercentage = document.querySelector<HTMLSpanElement>(
  "#dashboard__rejected span",
)!;

const workspace = document.querySelector<HTMLDivElement>("#workspace");
const jobSideArea = document.querySelector<HTMLElement>("#job-side-area");
const jobSideCloseButton = document.querySelector<HTMLButtonElement>(
  "#job-side-close-button",
)!;
const jobSideTitle = document.querySelector<HTMLElement>("#job-side__title")!;
const jobSidecompany =
  document.querySelector<HTMLElement>("#job-side__company")!;
const jobSideOpenLink =
  document.querySelector<HTMLElement>("#job-side__open a")!;
const jobSideEditButton =
  document.querySelector<HTMLElement>("#job-side__edit")!;
const jobSideDeleteButton =
  document.querySelector<HTMLElement>("#job-side__delete")!;
const jobSideLocation = document.querySelector<HTMLElement>(
  "#job-side__location",
)!;
const jobSideAppliedDate = document.querySelector<HTMLElement>(
  "#job-side__applied-date",
)!;
const jobSideStatus = document.querySelector<HTMLElement>("#job-side__status")!;
const jobSideRating = document.querySelector<HTMLElement>("#job-side__rating")!;
const jobSideNotes = document.querySelector<HTMLElement>("#job-side__notes")!;

const timeLineSection =
  document.querySelector<HTMLDivElement>("#timeline-section");

// Functions for Job array Logic
function DeleteJob(job: job): void {
  // update job array
  const index = jobs.findIndex((currentJob) => currentJob.id === job.id);

  if (index !== -1) {
    jobs.splice(index, 1);
  }

  // update flitered job array
  const FilteredIndex = filteredJobs.findIndex(
    (currentJob) => currentJob.id === job.id,
  );

  if (FilteredIndex !== -1) {
    filteredJobs.splice(FilteredIndex, 1);
  }

  // update UI KanbanBoard
  RemoveJobCardFromUI(job.id);
}

// utlity functions

function calculateAverageRating(): string {
  const total = jobs.reduce((sum, job) => {
    return job.rating + sum;
  }, 0);
  return (total / jobs.length).toFixed(1);
}

function calculateDateFilter(): Date | null {
  const now = new Date();

  switch (dateFilterInput.value) {
    case "week": {
      const date = new Date(now);
      date.setDate(date.getDate() - 7);
      return date;
    }

    case "month": {
      const date = new Date(now);
      date.setMonth(date.getMonth() - 1);
      return date;
    }

    case "3-months": {
      const date = new Date(now);
      date.setMonth(date.getMonth() - 3);
      return date;
    }

    case "all":
      return null;

    default:
      return null;
  }
}
function applyFilters() {
  const searchValue = searchBarInput.value.toLowerCase();
  const cutoffDate = calculateDateFilter();

  filteredJobs = jobs
    .filter((job) => {
      const searchFilter =
        job.title.toLowerCase().includes(searchValue) ||
        job.company.toLowerCase().includes(searchValue) ||
        job.notes?.toLowerCase().includes(searchValue) ||
        job.location.toLowerCase().includes(searchValue);

      const ratingFilter =
        ratingFilterInput.value === "all" ||
        job.rating === Number(ratingFilterInput.value);

      const dateFilter =
        cutoffDate === null || new Date(job.appliedDate) >= cutoffDate;

      console.log(ratingFilterInput.value);
      console.log(job.rating);

      return searchFilter && ratingFilter && dateFilter;
    })
    .sort((a: job, b: job) => {
      switch (sortByInput.value) {
        case "newest":
          return (
            new Date(b.appliedDate).getTime() -
            new Date(a.appliedDate).getTime()
          );

        case "oldest":
          return (
            new Date(a.appliedDate).getTime() -
            new Date(b.appliedDate).getTime()
          );

        case "highestRated":
          return b.rating - a.rating;

        case "lowestRated":
          return a.rating - b.rating;

        case "a-z":
          return a.company.localeCompare(b.company);

        case "z-a":
          return b.company.localeCompare(a.company);

        default:
          return 0;
      }
    });

  renderJobs(filteredJobs);
  updateKanbanCounts();
}

// Rendering UI Functions

function updateAverageRating(): void {
  dashboardRating.textContent = calculateAverageRating();
}

function updateJobSideArea(job: job) {
  selectedSideJob = job;

  jobSideTitle.textContent = job.title;
  jobSidecompany.textContent = job.company;
  jobSideOpenLink.setAttribute("href", job.url);
  jobSideLocation.textContent = job.location;
  jobSideAppliedDate.textContent = job.appliedDate;
  jobSideStatus.textContent = job.status;
  jobSideNotes.textContent = job.notes ?? "";

  let starString = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= job.rating) {
      starString += "&starf;";
    } else {
      starString += "&star;";
    }
  }
  jobSideRating.innerHTML = starString;
  createTimeLine(job);
}

function updateKanbanCounts() {
  const appliedCount = document.querySelector<HTMLSpanElement>(
    "#kanban-applied-number",
  );
  const interviewedCount = document.querySelector<HTMLSpanElement>(
    "#kanban-interviewed-number",
  );
  const offeredCount = document.querySelector<HTMLSpanElement>(
    "#kanban-offered-number",
  );
  const rejectedCount = document.querySelector<HTMLSpanElement>(
    "#kanban-rejected-number",
  );

  const jobStats = getJobStats(filteredJobs);

  appliedCount!.textContent = String(jobStats.appliedNum);
  interviewedCount!.textContent = String(jobStats.interviewedNum);
  offeredCount!.textContent = String(jobStats.offeredNum);
  rejectedCount!.textContent = String(jobStats.rejectedNum);
}

function updateDashboardCounts() {
  const { appliedNum, interviewedNum, offeredNum, rejectedNum } =
    getJobStats(jobs);

  const total = jobs.length;

  dashboardTotalNum.textContent = String(total);
  dashboardAppliedlNum.textContent = String(appliedNum);
  dashboardAppliedPercentage.textContent = ((appliedNum / total) * 100).toFixed(
    1,
  );
  dashboardInterviewedNum.textContent = String(interviewedNum);
  dashboardInterviewedPercentage.textContent = (
    (interviewedNum / total) *
    100
  ).toFixed(1);

  dashboardOfferedNum.textContent = String(offeredNum);
  dashboardOfferedPercentage.textContent = ((offeredNum / total) * 100).toFixed(
    1,
  );

  dashboardRejectedNum.textContent = String(rejectedNum);
  dashboardRejectedPercentage.textContent = (
    (rejectedNum / total) *
    100
  ).toFixed(1);
}

function createJobCard(job: job, board: HTMLDivElement): void {
  // job card
  const card = document.createElement("div");
  card.id = job.id;
  card.draggable = true;
  card.classList.add(
    "w-full",
    "box-border",
    "min-w-0",
    "p-2",
    "pl-5",
    "pr-3",
    "rounded-lg",
    "shadow-[0_0_10px_rgba(0,0,0,0.15)]",
    "cursor-pointer",
    "hover:bg-slate-500/5",
    "job",
  );

  // Title Section - title and edit section
  const titleSection = document.createElement("div");
  titleSection.classList.add(
    "flex",
    "items-center",
    "gap-2",
    "min-w-0",
    "w-full",
  );

  // Title Section - title
  const title = document.createElement("h5");
  title.classList.add(
    "text-[0.8rem]",
    "mb-1",
    "font-bold",
    "min-w-0",
    "truncate",
  );
  title.textContent = job.title;
  titleSection.append(title);

  //Title Section -  edit icon
  const EditIcon = createIcon(
    [
      "w-[1.1rem]",
      "min-w-[17.6px]",
      "shrink-0",
      "ml-auto",
      "hover:fill-green-500",
    ],
    "M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z",
  );

  EditIcon.addEventListener("click", () => {
    openEditModal(job);
  });

  titleSection.append(EditIcon);

  // Company Section
  const companySection = document.createElement("div");
  companySection.id = "company-section";
  companySection.classList.add("flex", "items-center", "gap-2");
  const companyIcon = createIcon(
    ["w-5"],
    "M192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L272 528L272 448C272 430.3 286.3 416 304 416L336 416C353.7 416 368 430.3 368 448L368 528L448 528C456.8 528 464 520.8 464 512L464 128C464 119.2 456.8 112 448 112L192 112zM128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM224 176C224 167.2 231.2 160 240 160L272 160C280.8 160 288 167.2 288 176L288 208C288 216.8 280.8 224 272 224L240 224C231.2 224 224 216.8 224 208L224 176zM368 160L400 160C408.8 160 416 167.2 416 176L416 208C416 216.8 408.8 224 400 224L368 224C359.2 224 352 216.8 352 208L352 176C352 167.2 359.2 160 368 160zM224 304C224 295.2 231.2 288 240 288L272 288C280.8 288 288 295.2 288 304L288 336C288 344.8 280.8 352 272 352L240 352C231.2 352 224 344.8 224 336L224 304zM368 288L400 288C408.8 288 416 295.2 416 304L416 336C416 344.8 408.8 352 400 352L368 352C359.2 352 352 344.8 352 336L352 304C352 295.2 359.2 288 368 288z",
  );
  companySection.append(companyIcon);

  const companyTitle = document.createElement("p");
  companyTitle.textContent = job.company;
  companyTitle.classList.add("text-xs", "font-light");
  companySection.append(companyTitle);

  // Location Section
  const locationSection = document.createElement("div");
  locationSection.id = "location-section";
  locationSection.classList.add("flex", "items-center", "gap-2");
  const locationIcon = createIcon(
    ["w-5"],
    "M576 112C576 103.7 571.7 96 564.7 91.6C557.7 87.2 548.8 86.8 541.4 90.5L416.5 152.1L244 93.4C230.3 88.7 215.3 89.6 202.1 95.7L77.8 154.3C69.4 158.2 64 166.7 64 176L64 528C64 536.2 68.2 543.9 75.1 548.3C82 552.7 90.7 553.2 98.2 549.7L225.5 489.8L396.2 546.7C409.9 551.3 424.7 550.4 437.8 544.2L562.2 485.7C570.6 481.7 576 473.3 576 464L576 112zM208 146.1L208 445.1L112 490.3L112 191.3L208 146.1zM256 449.4L256 148.3L384 191.8L384 492.1L256 449.4zM432 198L528 150.6L528 448.8L432 494L432 198z",
  );
  locationSection.append(locationIcon);

  const locationTitle = document.createElement("p");
  locationTitle.textContent = job.location;
  locationTitle.classList.add("text-xs", "font-light");
  locationSection.append(locationTitle);

  // date
  const dateSection = document.createElement("div");
  dateSection.classList.add("flex", "items-center", "gap-2");

  const dateIcon = createIcon(
    ["w-5"],
    "M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z",
  );

  dateSection.append(dateIcon);

  const datestamp = document.createElement("p");
  datestamp.classList.add(
    "text-[0.7rem]",
    "flex",
    "items-center",
    "font-light",
  );
  const date = job.appliedDate;
  datestamp.textContent = date;
  dateSection.append(datestamp);

  // Rating seciton
  const ratingSection = document.createElement("div");
  ratingSection.id = "rating-section";
  ratingSection.classList.add(
    "flex",
    "mt-2",
    "items-center",
    "min-w-0",
    "overflow-hidden",
  );
  job.rating;

  for (let i = 1; i <= 5; i++) {
    const spanEl = document.createElement("span");
    if (i <= job.rating) {
      spanEl.innerHTML = "&starf;";
    } else {
      spanEl.innerHTML = "&star;";
    }
    spanEl.classList.add("text-amber-500", "text-base", "min-w-0");
    ratingSection.append(spanEl);
  }

  const ratingTitle = document.createElement("p");
  ratingTitle.textContent = `${job.rating} ${job.rating === 1 ? "star" : "stars"}`;
  ratingTitle.classList.add(
    "text-xs",
    "font-light",
    "ml-2",
    "whitespace-nowrap",
    "shrink-0",
  );
  ratingSection.append(ratingTitle);

  // card footer
  const cardFooter = document.createElement("div");
  cardFooter.id = "";
  cardFooter.classList.add(
    "w-full",
    "mt-3",
    "flex",
    "items-center",
    "gap-3",
    "min-w-0",
    "overflow-hidden",
  );

  // anchor
  const url = document.createElement("a");
  url.href = job.url;
  url.setAttribute("target", "_target");

  const urlIcon = createIcon(
    ["w-[1.1rem]", "hover:fill-indigo-700"],
    "M288.6 76.8C344.8 20.6 436 20.6 492.2 76.8C548.4 133 548.4 224.2 492.2 280.4L328.2 444.4C293.8 478.8 238.1 478.8 203.7 444.4C169.3 410 169.3 354.3 203.7 319.9L356.5 167.3C369 154.8 389.3 154.8 401.8 167.3C414.3 179.8 414.3 200.1 401.8 212.6L249 365.3C239.6 374.7 239.6 389.9 249 399.2C258.4 408.5 273.6 408.6 282.9 399.2L446.9 235.2C478.1 204 478.1 153.3 446.9 122.1C415.7 90.9 365 90.9 333.8 122.1L169.8 286.1C116.7 339.2 116.7 425.3 169.8 478.4C222.9 531.5 309 531.5 362.1 478.4L492.3 348.3C504.8 335.8 525.1 335.8 537.6 348.3C550.1 360.8 550.1 381.1 537.6 393.6L407.4 523.6C329.3 601.7 202.7 601.7 124.6 523.6C46.5 445.5 46.5 318.9 124.6 240.8L288.6 76.8z",
  );
  url.append(urlIcon);
  cardFooter.append(url);

  // read more button
  const readmore = document.createElement("button");
  readmore.classList.add(
    "text-xs",
    "bg-transparent",
    "cursor-pointer",
    "hover:underline",
    "hover:text-indigo-700",
    "shrink-0",
  );
  readmore.innerHTML = "Read More >";
  readmore.addEventListener("click", () => {
    openJobSide(job);
  });

  cardFooter.append(readmore);

  // appending
  card.append(titleSection);
  card.append(companySection);
  card.append(locationSection);
  card.append(dateSection);
  card.append(ratingSection);
  card.append(cardFooter);

  board.append(card);
}

function openEditModal(job: job) {
  handleEditApplication(job);

  headerTitle.textContent = "Edit application";
  headerText.textContent = "Update the details of the job application";
  submitFormButton.textContent = "Update Appication";
}

function RemoveJobCardFromUI(id: string): void {
  const jobCard = document.getElementById(id) as HTMLDivElement;
  jobCard?.remove();
}

function createTimeline(job: job): HTMLDivElement {
  const timeline = document.createElement("div");
  timeline.classList.add("relative", "text-xs", "text-white");
  timeline.setAttribute("id", "timeline");

  const line = document.createElement("div");
  line.classList.add(
    "absolute",
    "left-2",
    "top-2",
    "h-[calc(100%-1rem)]",
    "w-px",
    "bg-gray-300",
  );

  timeline.append(line);

  function createStage(
    labelText: string,
    dateText: string,
    completed: boolean,
    rejected: boolean = false,
  ): HTMLDivElement {
    const stage = document.createElement("div");
    stage.classList.add("flex", "gap-4", "mt-8");

    const dot = document.createElement("div");
    dot.classList.add("z-10", "rounded-full", "size-4", "shrink-0");

    if (rejected) {
      dot.classList.add("bg-red-500");
    } else if (completed) {
      dot.classList.add("bg-indigo-600");
    } else {
      dot.classList.add("bg-white", "border-2", "border-gray-300");
    }

    const content = document.createElement("div");
    content.classList.add("flex", "justify-between", "flex-1");

    const label = document.createElement("p");
    label.textContent = labelText;

    const date = document.createElement("p");
    date.textContent = dateText;

    if (!completed) {
      label.classList.add("text-gray-400");
      date.classList.add("text-gray-400");
    } else {
      date.classList.add("text-gray-500");
    }

    if (rejected) {
      label.classList.add("text-red-400");
    }

    content.append(label, date);
    stage.append(dot, content);

    return stage;
  }

  // Applied — always exists
  const applied = createStage("Applied", job.appliedDate, true);

  // Applied shouldn't have mt-8
  applied.classList.remove("mt-8");

  timeline.append(applied);

  // Interview
  if (job.interviewedDate) {
    timeline.append(createStage("Interview", job.interviewedDate, true));
  }

  // Offer
  if (job.offerDate) {
    timeline.append(createStage("Offer", job.offerDate, true));
  }
  // Rejected
  else if (job.rejectedDate) {
    timeline.append(createStage("Rejected", job.rejectedDate, true, true));
  }
  // Still waiting for outcome
  else {
    timeline.append(createStage("Offer", "—", false));
  }

  return timeline;
}

// fucntion to create SVG icons by passing the path and classes for styling
function createIcon(classes: string[], pathString: string): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 640 640");

  classes.forEach((classAtr) => {
    svg.classList.add(classAtr);
  });

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", pathString);

  svg.appendChild(path);

  return svg;
}

function updateStarUI(id: number, state: starState) {
  const stars = document.querySelectorAll<HTMLDivElement>(".star");
  const message = document.querySelector<HTMLSpanElement>(
    "#star-rating #message",
  )!;
  let newStarState: "&star;" | "&starf;" = "&starf;";

  const messages: string[] = [
    "Minimal alignment with the required skills",
    "Limited alignment with the required skills",
    "A stretch, with several skills to develop",
    "Strong alignment, with most skills covered",
    "Full alignment with the required skills",
  ];

  if (state === "outline") {
    newStarState = `&star;`;
  }

  stars.forEach((star) => {
    const starId = Number(star.dataset.rating)!;
    if (id === 0) {
      star.innerHTML = "&star;";
    } else if (starId <= id) {
      star.innerHTML = newStarState;
    }
  });

  if (state === "outline") {
    message.innerHTML = "";
  } else {
    message.innerHTML = messages[id - 1];
  }
}

function renderJobs(jobArray: job[]) {
  interviewedContentArea.innerHTML = "";
  appliedContentArea.innerHTML = "";
  offeredContentArea.innerHTML = "";
  rejectedContentArea.innerHTML = "";

  jobArray.forEach((job) => {
    createJobCard(job, findBoard(job.status));
  });
}

function startApp(): void {
  const savedJobs = loadJobs();

  if (savedJobs === null) {
    saveJobs();
  } else {
    jobs.length = 0;

    savedJobs.forEach((savedJob) => jobs.push(savedJob));
  }

  applyFilters();
  updateAverageRating();
  updateDashboardCharts();
  updateDashboardCounts();
}

function closeJobSide() {
  workspace?.classList.remove("grid-cols-[1fr_auto]");
  jobSideArea?.classList.add("hidden");

  dashboard?.classList.remove("lg:w-11/12");
  dashboard?.classList.add("lg:w-10/12");

  kanbanBoard?.classList.remove("lg:w-11/12");
  kanbanBoard?.classList.add("lg:w-10/12");

  document.querySelector<HTMLDivElement>("#timeline")?.remove();
}

function openJobSide(job: job) {
  workspace?.classList.add("grid-cols-[1fr_auto]");
  dashboard?.classList.remove("lg:w-10/12");
  dashboard?.classList.add("lg:w-11/12");

  kanbanBoard?.classList.remove("lg:w-10/12");
  kanbanBoard?.classList.add("lg:w-11/12");

  jobSideArea?.classList.remove("hidden");
  updateJobSideArea(job);
}

function createTimeLine(job: job) {
  const timeLine = document.querySelector<HTMLDivElement>("#timeline");

  if (timeLine) {
    timeLine.remove();
  }
  timeLineSection?.append(createTimeline(job));
}

function closeModal(): void {
  title.value = "";
  company.value = "";
  jobLocation.value = "";
  dateApplied.value = "";
  dateOffered.value = "";
  dateInterviewed.value = "";
  dateRejected.value = "";
  url.value = "";
  jobStatus.value = "";
  notes.value = "";
  clickedRating = 0;
  updateStarUI(0, "outline");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function openModal(): void {
  modal.classList.add("flex");
  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  updateStarRating();

  headerTitle.textContent = "Add new application";
  headerText.textContent = "Fill in the details of the job application";
  submitFormButton.textContent = "Submit Application";
}

function handleOpeningSideMenu() {
  sideMenuOverlay.classList.remove("hidden");
}

function handleClosingSideMenu() {
  sideMenuOverlay.classList.add("hidden");
}

// form/modal function

function handleEditApplication(job: job) {
  openModal();

  title.value = job.title;
  company.value = job.company;
  jobLocation.value = job.location;
  dateApplied.value = job.appliedDate;
  dateOffered.value = job.offerDate ?? "";
  dateInterviewed.value = job.interviewedDate ?? "";
  dateRejected.value = job.rejectedDate ?? "";
  url.value = job.url;
  jobStatus.value = job.status;
  notes.value = job.notes ?? "";
  clickedRating = job.rating;
  updateStarUI(job.rating, "full");
  editExistingJobId = job.id;
}

function handleApplicationSubmit(event: SubmitEvent) {
  event.preventDefault();

  if (clickedRating === 0) {
    return;
  }

  if (editExistingJobId === null) {
    const newJob: job = {
      id: crypto.randomUUID(),
      title: title.value,
      company: company.value,
      location: jobLocation.value,
      appliedDate: dateApplied.value,
      offerDate: dateOffered.value,
      interviewedDate: dateInterviewed.value,
      rejectedDate: dateRejected.value,
      url: url.value,
      status: jobStatus.value as JobStatus,
      notes: notes.value,
      rating: clickedRating,
    };

    jobs.push(newJob);

    applyFilters();
  } else {
    const currentJob = jobs.find((job) => job.id === editExistingJobId)!;
    currentJob.title = title.value;
    currentJob.company = company.value;
    currentJob.location = jobLocation.value;
    currentJob.appliedDate = dateApplied.value;
    currentJob.offerDate = dateOffered.value;
    currentJob.interviewedDate = dateInterviewed.value;
    currentJob.rejectedDate = dateRejected.value;
    currentJob.url = url.value;
    currentJob.status = jobStatus.value as JobStatus;
    currentJob.notes = notes.value;
    currentJob.rating = clickedRating;

    applyFilters();

    updateJobSideArea(currentJob);

    editExistingJobId = null;
  }

  saveJobs();
  updateAverageRating();
  updateDashboardCharts();
  updateDashboardCounts();
  closeModal();
}

function addJob(event: DragEvent, status: JobStatus): void {
  const id = event.dataTransfer?.getData("text/plain")!;
  // update array
  const currentJob = jobs.find((job) => job.id === id)!;
  currentJob!.status = status;

  saveJobs();
  applyFilters();
  updateAverageRating();
  updateDashboardCharts();
  updateDashboardCounts();
  closeJobSide();
}

function findBoard(jobStatus: JobStatus): HTMLDivElement {
  if (jobStatus === JobStatus.applied) {
    return appliedContentArea;
  } else if (jobStatus === JobStatus.interviewed) {
    return interviewedContentArea;
  } else if (jobStatus === JobStatus.offered) {
    return offeredContentArea;
  } else {
    return rejectedContentArea;
  }
}

function updateStarRating() {
  const stars = document.querySelectorAll<HTMLDivElement>(".star");

  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      const starId = Number(star.dataset.rating);
      if (clickedRating > 0) {
        updateStarUI(0, "outline");
      }
      updateStarUI(starId, "full");
    });

    star.addEventListener("mouseleave", () => {
      const starId = Number(star.dataset.rating);
      updateStarUI(starId, "outline");
      if (clickedRating) {
        updateStarUI(clickedRating, "full");
      }
    });

    star.addEventListener("click", () => {
      const starId = Number(star.dataset.rating);
      clickedRating = starId;
      updateStarUI(starId, "full");
    });
  });
}

// Drag and Drop Event Listners
// uses bubbling for event propagation
document
  .querySelector<HTMLDivElement>("#kanban-board")!
  .addEventListener("dragstart", (event: DragEvent) => {
    const job = event.target as HTMLDivElement;
    event.dataTransfer?.setData("text/plain", job.id);
    console.log("Dragging has started");
  });

interviewedBoard.addEventListener("dragover", (e) => {
  e.preventDefault();
});

interviewedBoard.addEventListener("drop", (event: DragEvent) => {
  addJob(event, JobStatus.interviewed);
});

appliedBoard.addEventListener("dragover", (e) => {
  e.preventDefault();
});

appliedBoard.addEventListener("drop", (event: DragEvent) => {
  addJob(event, JobStatus.applied);
});

offeredBoard.addEventListener("dragover", (event: DragEvent) => {
  event.preventDefault();
});

offeredBoard.addEventListener("drop", (event: DragEvent) => {
  addJob(event, JobStatus.offered);
});

rejectedBoard.addEventListener("dragover", (event: DragEvent) => {
  event.preventDefault();
});

rejectedBoard.addEventListener("drop", (event: DragEvent) => {
  addJob(event, JobStatus.rejected);
});

// event Listeners

applicaitonButton.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
closeButton?.addEventListener("click", closeModal);
applicationForm?.addEventListener("submit", handleApplicationSubmit);
jobSideCloseButton.addEventListener("click", closeJobSide);
jobSideEditButton.addEventListener("click", () => {
  if (!selectedSideJob) return;
  openEditModal(selectedSideJob);
});
jobSideDeleteButton.addEventListener("click", () => {
  if (!selectedSideJob) return;
  DeleteJob(selectedSideJob);
  saveJobs();
  closeJobSide();
  updateAverageRating();
  updateDashboardCharts();
  updateKanbanCounts();
  updateDashboardCounts();
});

searchBarInput.addEventListener("input", applyFilters);
ratingFilterInput.addEventListener("change", applyFilters);
dateFilterInput.addEventListener("change", applyFilters);
sortByInput.addEventListener("change", applyFilters);

sideMenuIcon.addEventListener("click", handleOpeningSideMenu);
sideMenuCloseButton.addEventListener("click", handleClosingSideMenu);
sideMenuOverlay.addEventListener("click", handleClosingSideMenu);
sideMenu.addEventListener("click", (event: PointerEvent) => {
  event.stopPropagation();
});
exportButton.addEventListener("click", () => {
  exportJobsToCSV(jobs);
});

startApp();
