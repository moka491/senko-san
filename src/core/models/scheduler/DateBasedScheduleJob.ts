import {
  Table,
  Column,
  Model,
  ForeignKey,
  NotNull,
} from "sequelize-typescript";
import { ScheduleJob } from "./ScheduleJob";

/**
 * DateBasedScheduleJob is a type of ScheduleJob that
 * is executed at a certain date and time in the future.
 * It's created whenever a user specifies a date or something like "next Monday"
 */
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
