import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";
import { DataTypes } from "sequelize/types";

/**
 * The User class holds various information about a single Discord user on a server.
 * The information is encrypted where necessary.
 */
@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column(DataTypes.BIGINT)
  id: string;

  @Column
  timeZone: string;
}
