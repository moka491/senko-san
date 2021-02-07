import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import { TYPES } from "../types";
import { ConfigHandler } from "./ConfigHandler";

@injectable()
export class DataHandler {
  private sequelize: Sequelize;

  constructor(
    @inject(TYPES.ConfigHandler) private configHandler: ConfigHandler
  ) {
    const { database } = this.configHandler.config;

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

    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<void> {
    await this.sequelize.authenticate().catch((err) => {
      console.log("Couldn't connect to database server! Error: " + err);
      process.exit(1);
    });

    await this.sequelize.sync().catch((err) => {
      console.log("Couldn't sync database with data model! Error: " + err);
      process.exit(1);
    });
  }
}
