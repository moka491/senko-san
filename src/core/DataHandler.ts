import { Sequelize } from "sequelize-typescript";
import { Config } from "./Config";

export class DataHandler {
  private sequelize: Sequelize;

  constructor({ database }: Config) {
    this.sequelize = new Sequelize(
      database.database,
      database.username,
      database.password,
      {
        host: database.hostname,
        dialect: "postgres",
        ...(!database.logQueries && { logging: false }),
        models: ["models/**/*!(.test.ts|.test.js)"],
      }
    );
  }

  async init() {
    await this.sequelize.authenticate().catch((err) => {
      throw Error("Couldn't connect to database server! Error: " + err);
    });

    await this.sequelize.sync().catch((err) => {
      throw Error("Couldn't sync database with data model! Error: " + err);
    });
  }
}
