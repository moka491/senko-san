import {
  Table,
  Column,
  Model,
  ForeignKey,
  NotNull,
} from "sequelize-typescript";

import { ScheduleJob } from "./ScheduleJob";

@Table
export class DateBasedScheduleJob extends Model<DateBasedScheduleJob> {
  /**
   * The Id of the scheduling job that this data belongs to
   */
  @ForeignKey(() => ScheduleJob)
  @Column
  jobId: number;

  /**
   * The date and time at which the job will be executed
   */
  @NotNull
  @Column
  executeAt: Date;
}
