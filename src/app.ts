
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



const interviewd = document.getElementById("interviewed") as HTMLDivElement;
const applied = document.getElementById("applied") as HTMLDivElement;

document.querySelectorAll<HTMLDivElement>(".job").forEach((job)=>{
    job.addEventListener("dragstart", (event)=>{
         event.dataTransfer?.setData("text/plain", job.id)
    console.log("Dragging has started");
})

})
interviewd.addEventListener("dragover", (e)=>{
    e.preventDefault();
})

interviewd.addEventListener("drop", (event)=>{
    const jobId = event.dataTransfer?.getData("text/plain")!;
    const job = document.getElementById(jobId) as HTMLDivElement;
    interviewd.append(job);
    console.log(jobId)
})

applied.addEventListener("dragover", (e)=>{
    e.preventDefault();
})

applied.addEventListener("drop", (event)=>{
    // resaubality - add a resusable function
    const jobId = event.dataTransfer?.getData("text/plain")!;
    const job = document.getElementById(jobId) as HTMLDivElement;
    applied.append(job);
    console.log(jobId)
})