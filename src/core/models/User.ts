import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

/**
 * The User class holds various information about a single Discord user on a server.
 * The information is encrypted where necessary.
 */
@Table
export class User extends Model<User> {
  /**
   * The Discord.js User Id of the user, also used as the primary key
   */
  @PrimaryKey
  @Column
  id: number;

  /**
   * An optionally given timezone the user lives in.
   * This is required for dateTime related operations and
   * the user will be asked to provide it the first time this info is needed.
   * The user then does not have to provide it again.
   */
  @Column
  timeZone: string;
}
