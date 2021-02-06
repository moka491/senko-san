import "reflect-metadata";
import { container } from "tsyringe";
import { Bot } from "./core/Bot";

const bot = container.resolve(Bot);
(async () => {
  bot.start();
})();
