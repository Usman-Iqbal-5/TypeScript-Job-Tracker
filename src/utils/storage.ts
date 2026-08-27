import jobs from "../shared_state";
import { job } from "../types/job";

export function saveJobs (){
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

export function loadJobs(): job[] | null{
    const savedJobs = localStorage.getItem("jobs");

   if (savedJobs === null) {
        return null;
    }

    return JSON.parse(savedJobs);
}