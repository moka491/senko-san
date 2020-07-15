import { Table, Column, Model } from "sequelize-typescript";
import { User } from "discord.js";
import { ScheduleAction } from "./ScheduleAction";

/**
 * A junction table recording the many-to-many relation between Users
 * who can be mentioned when a scheduled task executes.
 */
@Table
export class UserScheduleAction extends Model<UserScheduleAction> {
  /**
   * The user which is mentioned in the scheduled task
   */
  @Column
  user: User;

  /**
   * The action of the task in which he will be mentioned
   */
  @Column
  scheduleAction: ScheduleAction;
}
