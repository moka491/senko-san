import { Bot } from "./core/Bot";
import { CommandHandler } from "./core/CommandHandler";
import { ConfigHandler } from "./core/ConfigHandler";
import { DataHandler } from "./core/DataHandler";
import { container } from "./inversify.config";
import { TYPES } from "./types";

const bot = container.get<Bot>(TYPES.Bot);
container.get<CommandHandler>(TYPES.CommandHandler);
container.get<DataHandler>(TYPES.DataHandler);
container.get<ConfigHandler>(TYPES.ConfigHandler);

bot.start();
