import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";
import { User } from "../User";
import { UserScheduleAction } from "./UserScheduleAction";

/**
 * The ScheduleAction defines the action or task triggered whenever the
 * scheduled job is meant to "trigger", i.e. when the current date and time
 * matches it's defined conditions.
 */
@Table
export class ScheduleAction extends Model<ScheduleAction> {
  /**
   * Defines if the given messageString is to be interpreted as a
   * command that the bot should execute (isBotCommend = true) or
   * if it's just a text the user(s) should be reminded of.
   */
  @Column
  isBotCommand: boolean;

  /**
   * The message or command that the user(s) should be reminded with
   */
  @Column
  messageString: string;

  /**
   * The users which should be mentioned when the job triggers
   */
  @BelongsToMany(() => User, () => UserScheduleAction)
  @Column
  mentionUsers: User;
}
