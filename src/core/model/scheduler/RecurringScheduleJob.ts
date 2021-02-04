import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { ScheduleJob } from "./ScheduleJob";

/**
 * RecurringScheduleJob is a type of ScheduleJob that
 * is executed at a specified interval, defined by a cron rule.
 * It's created whenever a user specifies a cron rule to use,
 * or a string like "every minute", "every Tuesday" etc.
 */
@Table
export class RecurringScheduleJob extends Model {
  @ForeignKey(() => ScheduleJob)
  @Column
  jobId: number;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  cronRule: string;

  @BelongsTo(() => ScheduleJob)
  job: ScheduleJob;
}
