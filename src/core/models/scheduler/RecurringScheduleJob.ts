import { Table, Column, Model, ForeignKey } from "sequelize-typescript";

import { ScheduleJob } from "./ScheduleJob";

/**
 * RecurringScheduleJob is a type of ScheduleJob that
 * is executed at a specified interval, defined by a cron rule.
 * It's created whenever a user specifies a cron rule to use,
 * or a string like "every minute", "every Tuesday" etc.
 */
@Table
export class RecurringScheduleJob extends Model<RecurringScheduleJob> {
  /**
   * The Id of the scheduling job that this data belongs to
   */
  @ForeignKey(() => ScheduleJob)
  @Column
  public jobId: number;

  /**
   * An optional starting date before which this job wouldn't execute
   */
  @Column
  public startDate: Date;

  /**
   * An optional ending date after which the job stops executing.
   * If not set, it will reoccur forever
   */
  @Column
  public endDate: Date;

  /**
   * The rule string with which the scheduler decides when to execute the job
   */
  @Column
  public cronRule: string;
}
