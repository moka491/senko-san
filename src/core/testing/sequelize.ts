import { Model, Sequelize } from "sequelize-typescript";

export async function createSequalizeTestDb(models: Array<any>) {
  const sequelize = new Sequelize({
    database: "test_db",
    dialect: "sqlite",
    username: "root",
    password: "",
    storage: ":memory:",
    logging: false,
    models,
  });

  await sequelize.sync();
  return sequelize;
}
