import { Sequelize } from "sequelize-typescript";
import { singleton } from "tsyringe";
import { Config } from "./Config";
import { ConfigHandler } from "./ConfigHandler";

@singleton()
export class DataHandler {
  private sequelize: Sequelize;

  constructor(private configHandler: ConfigHandler) {
    const { database } = configHandler.config;

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

  async init(): Promise<void> {
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
