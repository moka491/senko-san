import { Table, Column, Model } from "sequelize-typescript";
import { User } from "discord.js";
import { ScheduleAction } from "./ScheduleAction";

@Table
export class UserScheduleAction extends Model<UserScheduleAction> {
  @Column
  user: User;

  @Column
  scheduleAction: ScheduleAction;
}
