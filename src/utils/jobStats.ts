import {job, JobStatus } from "../types/job"

export default function getJobStats (jobArray: job[]): {
    appliedNum: number;
    interviewedNum: number;
    offeredNum: number;
    rejectedNum: number;
}{
    return {
    appliedNum: jobArray.filter((job) => job.status === JobStatus.applied).length,
    interviewedNum: jobArray.filter((job) => job.status === JobStatus.interviewed).length,
    offeredNum: jobArray.filter((job) => job.status === JobStatus.offered).length,
    rejectedNum: jobArray.filter((job) => job.status === JobStatus.rejected).length,
    }
}