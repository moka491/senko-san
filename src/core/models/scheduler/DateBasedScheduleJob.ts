import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ScheduleJob } from "./ScheduleJob";

/**
 * DateBasedScheduleJob is a type of ScheduleJob that
 * is executed at a certain date and time in the future.
 * It's created whenever a user specifies a date or something like "next Monday"
 */
@Table
export class DateBasedScheduleJob extends Model<DateBasedScheduleJob> {
  @ForeignKey(() => ScheduleJob)
  @Column
  jobId: number;

  @Column
  executionDate: Date;

  @BelongsTo(() => ScheduleJob)
  job: ScheduleJob;
}
