import { CronJob } from "cron";
import { ScheduleJob } from "./models/scheduler/ScheduleJob";

export class Scheduler {
  private jobList: Map<ScheduleJob, CronJob>;

  constructor() {
    this.jobList = new Map();
  }

  schedule(job: ScheduleJob) {
    // const cronJob = new CronJob(
    //   job.cronRule || job.fixedDate,
    //   this.executeJob(job),
    //   null,
    //   true
    // );
    // this.jobList.set(job, cronJob);
  }

  scheduleAll(jobs: ScheduleJob[]) {
    jobs.forEach(this.schedule);
  }

  private executeJob(job: ScheduleJob) {}
}
