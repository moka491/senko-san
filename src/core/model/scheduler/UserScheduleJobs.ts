import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { ScheduleJob } from "./ScheduleJob";
import { User } from "../User";

/**
 * A junction table recording the many-to-many relation between Users
 * who can be mentioned when a scheduled task executes.
 */
@Table
export class UserScheduleJobs extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => ScheduleJob)
  @Column
  scheduleJobId: number;
}
