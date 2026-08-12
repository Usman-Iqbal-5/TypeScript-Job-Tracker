"use strict";
// let draggedJob: HTMLElement | null;
// const interviewd = document.getElementById("interviewed") as HTMLDivElement;
// const applied = document.getElementById("applied") as HTMLDivElement;
// document.querySelectorAll(".jobs").forEach((job)=>{
//     job.addEventListener("dragstart", (event)=>{
//         draggedJob= event.target as HTMLElement;
//     console.log("Dragging has started");
// })
// })
// interviewd.addEventListener("dragover", (e)=>{
//     e.preventDefault();
// })
// interviewd.addEventListener("drop", ()=>{
//     interviewd.append(draggedJob!);
// })
// applied.addEventListener("dragover", (e)=>{
//     e.preventDefault();
// })
// applied.addEventListener("drop", ()=>{
//     applied.append(draggedJob!);
// })
const interviewd = document.getElementById("interviewed");
const applied = document.getElementById("applied");
document.querySelectorAll(".job").forEach((job) => {
    job.addEventListener("dragstart", (event) => {
        var _a;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", job.id);
        console.log("Dragging has started");
    });
});
interviewd.addEventListener("dragover", (e) => {
    e.preventDefault();
});
interviewd.addEventListener("drop", (event) => {
    var _a;
    const jobId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    const job = document.getElementById(jobId);
    interviewd.append(job);
    console.log(jobId);
});
applied.addEventListener("dragover", (e) => {
    e.preventDefault();
});
applied.addEventListener("drop", (event) => {
    var _a;
    // resaubality - add a resusable function
    const jobId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    const job = document.getElementById(jobId);
    applied.append(job);
    console.log(jobId);
});
