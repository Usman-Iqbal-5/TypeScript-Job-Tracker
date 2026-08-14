"use strict";
const jobs = [
    {
        id: crypto.randomUUID(),
        title: "Web Developer",
        company: "FinTech",
        location: "London, UK",
        appliedDate: Date.now(),
        url: "www.indeed.com",
        rating: 1,
        notes: "Good match of skills",
        status: 0 /* JobStatus.applied */,
    },
    {
        id: crypto.randomUUID(),
        title: "Software Developer",
        company: "TechFin",
        location: "Birmingham, UK",
        appliedDate: Date.now(),
        url: "www.indeed.com",
        rating: 5,
        notes: "Good match of skills",
        status: 2 /* JobStatus.offered */,
    },
];
function updateKanbanCounts() {
    const appliedCount = document.querySelector("#kanban-applied-number");
    const interviewedCount = document.querySelector("#kanban-interviewed-number");
    const offeredCount = document.querySelector("#kanban-offered-number");
    const rejectedCount = document.querySelector("#kanban-rejected-number");
    const appliedNum = jobs.filter((job) => job.status === 0 /* JobStatus.applied */).length;
    appliedCount.textContent = String(appliedNum);
    const interviewdNum = jobs.filter((job) => job.status === 1 /* JobStatus.interviewed */).length;
    interviewedCount.textContent = String(interviewdNum);
    const offeredNum = jobs.filter((job) => job.status === 2 /* JobStatus.offered */).length;
    offeredCount.textContent = String(offeredNum);
    const rejectedNum = jobs.filter((job) => job.status === 3 /* JobStatus.rejected */).length;
    rejectedCount.textContent = String(rejectedNum);
}
function createJobCard(job, board) {
    // job card
    const card = document.createElement("div");
    card.id = job.id;
    card.draggable = true;
    card.classList.add("w-full", "p-2", "pl-5", "pr-3", "rounded-lg", "shadow-[0_0_10px_rgba(0,0,0,0.15)]", "cursor-pointer", "job");
    // Title Section - title and edit section
    const titleSection = document.createElement("div");
    titleSection.classList.add("flex", "item-center", "gap-10");
    // Title Section - title
    const title = document.createElement("h5");
    title.classList.add("text-[0.8rem]", "mb-1", "font-bold");
    title.textContent = job.title;
    titleSection.append(title);
    //Title Section -  edit icon
    const EditIcon = createIcon(["w-[1.1rem]", "min-w-[17.6px]", "ml-auto", "hover:fill-green-500"], "M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z");
    titleSection.append(EditIcon);
    // Company Section
    const companySection = document.createElement("div");
    companySection.id = "company-section";
    companySection.classList.add("flex", "items-center", "gap-2");
    const companyIcon = createIcon(["w-5"], "M192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L272 528L272 448C272 430.3 286.3 416 304 416L336 416C353.7 416 368 430.3 368 448L368 528L448 528C456.8 528 464 520.8 464 512L464 128C464 119.2 456.8 112 448 112L192 112zM128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM224 176C224 167.2 231.2 160 240 160L272 160C280.8 160 288 167.2 288 176L288 208C288 216.8 280.8 224 272 224L240 224C231.2 224 224 216.8 224 208L224 176zM368 160L400 160C408.8 160 416 167.2 416 176L416 208C416 216.8 408.8 224 400 224L368 224C359.2 224 352 216.8 352 208L352 176C352 167.2 359.2 160 368 160zM224 304C224 295.2 231.2 288 240 288L272 288C280.8 288 288 295.2 288 304L288 336C288 344.8 280.8 352 272 352L240 352C231.2 352 224 344.8 224 336L224 304zM368 288L400 288C408.8 288 416 295.2 416 304L416 336C416 344.8 408.8 352 400 352L368 352C359.2 352 352 344.8 352 336L352 304C352 295.2 359.2 288 368 288z");
    companySection.append(companyIcon);
    const companyTitle = document.createElement("p");
    companyTitle.textContent = job.company;
    companyTitle.classList.add("text-xs", "font-light");
    companySection.append(companyTitle);
    // Location Section
    const locationSection = document.createElement("div");
    locationSection.id = "location-section";
    locationSection.classList.add("flex", "items-center", "gap-2");
    const locationIcon = createIcon(["w-5"], "M576 112C576 103.7 571.7 96 564.7 91.6C557.7 87.2 548.8 86.8 541.4 90.5L416.5 152.1L244 93.4C230.3 88.7 215.3 89.6 202.1 95.7L77.8 154.3C69.4 158.2 64 166.7 64 176L64 528C64 536.2 68.2 543.9 75.1 548.3C82 552.7 90.7 553.2 98.2 549.7L225.5 489.8L396.2 546.7C409.9 551.3 424.7 550.4 437.8 544.2L562.2 485.7C570.6 481.7 576 473.3 576 464L576 112zM208 146.1L208 445.1L112 490.3L112 191.3L208 146.1zM256 449.4L256 148.3L384 191.8L384 492.1L256 449.4zM432 198L528 150.6L528 448.8L432 494L432 198z");
    locationSection.append(locationIcon);
    const locationTitle = document.createElement("p");
    locationTitle.textContent = job.location;
    locationTitle.classList.add("text-xs", "font-light");
    locationSection.append(locationTitle);
    // Rating seciton
    const ratingSection = document.createElement("div");
    ratingSection.id = "rating-section";
    ratingSection.classList.add("flex", "items-center", "gap-2");
    const ratingIcon = createIcon(["w-5", "fill-yellow-400"], "M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z");
    ratingSection.append(ratingIcon);
    const ratingTitle = document.createElement("p");
    ratingTitle.textContent = `${job.rating} ${job.rating === 1 ? "star" : "stars"}`;
    ratingTitle.classList.add("text-xs", "font-light");
    ratingSection.append(ratingTitle);
    // card footer
    const cardFooter = document.createElement("div");
    cardFooter.id = "";
    cardFooter.classList.add("w-fit", "mt-5", "flex", "items-center", "gap-3");
    // anchor
    const url = document.createElement("a");
    url.href = job.url;
    const urlIcon = createIcon(["w-[1.1rem]", "hover:fill-indigo-700"], "M288.6 76.8C344.8 20.6 436 20.6 492.2 76.8C548.4 133 548.4 224.2 492.2 280.4L328.2 444.4C293.8 478.8 238.1 478.8 203.7 444.4C169.3 410 169.3 354.3 203.7 319.9L356.5 167.3C369 154.8 389.3 154.8 401.8 167.3C414.3 179.8 414.3 200.1 401.8 212.6L249 365.3C239.6 374.7 239.6 389.9 249 399.2C258.4 408.5 273.6 408.6 282.9 399.2L446.9 235.2C478.1 204 478.1 153.3 446.9 122.1C415.7 90.9 365 90.9 333.8 122.1L169.8 286.1C116.7 339.2 116.7 425.3 169.8 478.4C222.9 531.5 309 531.5 362.1 478.4L492.3 348.3C504.8 335.8 525.1 335.8 537.6 348.3C550.1 360.8 550.1 381.1 537.6 393.6L407.4 523.6C329.3 601.7 202.7 601.7 124.6 523.6C46.5 445.5 46.5 318.9 124.6 240.8L288.6 76.8z");
    url.append(urlIcon);
    cardFooter.append(url);
    // read more button
    const readmore = document.createElement("button");
    readmore.classList.add("text-[0.72rem]", "bg-transparent", "cursor-pointer", "underline", "hover:text-indigo-700");
    readmore.textContent = "read more";
    cardFooter.append(readmore);
    // date
    const datestamp = document.createElement("span");
    datestamp.classList.add("text-[0.7rem]", "flex", "items-center", "p-1", "h-5", "font-extralight", "rounded-lg", "bg-gray-200");
    const date = new Date(job.appliedDate).toLocaleDateString("en-GB");
    datestamp.textContent = date;
    cardFooter.append(datestamp);
    // appending
    card.append(titleSection);
    card.append(companySection);
    card.append(locationSection);
    card.append(ratingSection);
    card.append(cardFooter);
    board.append(card);
}
// fucntion to create SVG icons by passing the path and classes for styling
function createIcon(classes, pathString) {
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
function findBoard(jobStatus) {
    if (jobStatus === 0 /* JobStatus.applied */) {
        return applied;
    }
    else if (jobStatus === 1 /* JobStatus.interviewed */) {
        return interviewed;
    }
    else if (jobStatus === 2 /* JobStatus.offered */) {
        return offered;
    }
    else {
        return rejected;
    }
}
const interviewed = document.getElementById("interviewed");
const applied = document.getElementById("applied");
const offered = document.getElementById("offered");
const rejected = document.getElementById("rejected");
jobs.forEach((job) => {
    createJobCard(job, findBoard(job.status));
});
updateKanbanCounts();
document
    .querySelectorAll(".job")
    .forEach((job) => {
    job.addEventListener("dragstart", (event) => {
        var _a;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", job.id);
        console.log("Dragging has started");
    });
});
interviewed.addEventListener("dragover", (e) => {
    e.preventDefault();
});
interviewed.addEventListener("drop", (event) => {
    addJob(event, interviewed, 1 /* JobStatus.interviewed */);
});
applied.addEventListener("dragover", (e) => {
    e.preventDefault();
});
applied.addEventListener("drop", (event) => {
    addJob(event, applied, 0 /* JobStatus.applied */);
});
offered.addEventListener("dragover", (event) => {
    event.preventDefault();
});
offered.addEventListener("drop", (event) => {
    addJob(event, offered, 2 /* JobStatus.offered */);
});
rejected.addEventListener("dragover", (event) => {
    event.preventDefault();
});
rejected.addEventListener("drop", (event) => {
    addJob(event, rejected, 3 /* JobStatus.rejected */);
});
function addJob(event, board, status) {
    var _a;
    const id = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    const job = document.getElementById(id);
    board.firstElementChild.after(job);
    // update array
    const currentJob = jobs.find((job) => job.id === id);
    currentJob.status = status;
    updateKanbanCounts();
}
