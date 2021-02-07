import "reflect-metadata";
import { Container, decorate, injectable } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./core/Bot";
import { Client, ClientOptions } from "discord.js";
import { ConfigHandler } from "./core/ConfigHandler";
import { DataHandler } from "./core/DataHandler";
import { CommandHandler } from "./core/CommandHandler";
import { CommandGroupClass } from "./core/types/CommandGroup";
import { SystemGroup } from "./commands/system";

const container = new Container({
  skipBaseClassChecks: true,
});

const clientOptions: ClientOptions = {
  shards: "auto",
};

const rootCommandGroups: CommandGroupClass[] = [SystemGroup];

decorate(injectable(), Client);

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();

container
  .bind<ClientOptions>(TYPES.ClientOptions)
  .toConstantValue(clientOptions);

container
  .bind<CommandGroupClass[]>(TYPES.CommandGroups)
  .toConstantValue(rootCommandGroups);

container
  .bind<ConfigHandler>(TYPES.ConfigHandler)
  .to(ConfigHandler)
  .inSingletonScope();

container
  .bind<DataHandler>(TYPES.DataHandler)
  .to(DataHandler)
  .inSingletonScope();

container
  .bind<CommandHandler>(TYPES.CommandHandler)
  .to(CommandHandler)
  .inSingletonScope();

export { container };
