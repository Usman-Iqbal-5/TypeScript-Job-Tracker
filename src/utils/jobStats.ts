import { job, JobStatus } from "../types/job"

export default function getJobStats (jobs: job[]): {
    appliedNum: number;
    interviewedNum: number;
    offeredNum: number;
    rejectedNum: number;
}{
    return {
    appliedNum: jobs.filter((job) => job.status === JobStatus.applied).length,
    interviewedNum: jobs.filter((job) => job.status === JobStatus.interviewed).length,
    offeredNum: jobs.filter((job) => job.status === JobStatus.offered).length,
    rejectedNum: jobs.filter((job) => job.status === JobStatus.rejected).length,
    }
}