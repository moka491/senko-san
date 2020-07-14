import { Table, Column, Model } from "sequelize-typescript";
import { User } from "discord.js";
import { ScheduleAction } from "./ScheduleAction";

@Table
export class ScheduleJob extends Model<ScheduleJob> {
  /**
   * The Id of the server where this job was created in,
   * and where it will be executed
   */
  @Column
  serverId!: number;

  /**
   * The Id of the channel where the job will be executed (i.e. the reminder will be posted).
   * Can be the same as where the job was created from, or not if a different channel was explicitly mentioned.
   */
  @Column
  channelId!: number;

  /**
   * The creator of the scheduled job.
   */
  @Column
  jobOwner: User;

  /**
   * The task which should be executed whenever the job "triggers", i.e. the date or interval is met
   */
  @Column
  jobAction: ScheduleAction;
}
