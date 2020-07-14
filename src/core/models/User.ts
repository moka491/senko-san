import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  timeZone: string;
}
