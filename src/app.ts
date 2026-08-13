
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



const interviewed = document.getElementById("interviewed") as HTMLDivElement;
const applied = document.getElementById("applied") as HTMLDivElement;
const offered = document.getElementById("offered") as HTMLDivElement;
const rejected = document.getElementById("rejected") as HTMLDivElement; 

document.querySelectorAll<HTMLDivElement>(".job").forEach((job)=>{
    job.addEventListener("dragstart", (event)=>{
         event.dataTransfer?.setData("text/plain", job.id)
    console.log("Dragging has started");
})

})
interviewed.addEventListener("dragover", (e)=>{
    e.preventDefault();
})

interviewed.addEventListener("drop", (event)=>{
    addJob(event, interviewed);
})

applied.addEventListener("dragover", (e)=>{
    e.preventDefault();
})

applied.addEventListener("drop", (event)=>{
    addJob(event, applied);
})

offered.addEventListener("dragover", (event)=>{
    event.preventDefault();
})

offered.addEventListener("drop", (event)=>{
    addJob(event, offered);
});

rejected.addEventListener("dragover", (event)=>{
    event.preventDefault();
})

rejected.addEventListener("drop", (event)=>{
    addJob(event, rejected);
});



function addJob(event: DragEvent, board: HTMLDivElement): void{
    const id = event.dataTransfer?.getData("text/plain")!;
    const job = document.getElementById(id) as HTMLDivElement;
    board.append(job)
}