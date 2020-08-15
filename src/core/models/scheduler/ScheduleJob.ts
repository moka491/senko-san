import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../User";
import { UserScheduleJobs } from "./UserScheduleJobs";

/**
 * ScheduleJob defines a single scheduled task or reminder.
 * It can either be of type "DateBasedScheduleJob" when triggering at a fixed dateTime in the future,
 * or "RecurringScheduleJob" for recurring events.
 */
@Table
export class ScheduleJob extends Model<ScheduleJob> {
  @Column
  guildId: number;

  @Column
  channelId: number;

  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @Column
  fixedDate: Date;

  @Column
  isRecurring: boolean;

  @Column
  cronRule: string;

  @Column
  reminderString: string;

  @Column
  isCommand: boolean;

  @BelongsTo(() => User)
  creator: User;

  @BelongsToMany(() => User, () => UserScheduleJobs)
  mentionUsers: User[];
}
