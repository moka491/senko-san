import { Command } from "../../core/commands/Command";
import { command } from "../../core/commands/decorators";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";

@command({
  name: "ping",
  aliases: ["pg"],
  description: "Returns you a pong with arguments",
  examples: ["ping a b c", "pg 1 2 3"],
})
export class PingCommand extends Command {
  invoke(bot: Bot, message: Message, args: string[]): void {
    message.reply("Pong with args: " + args);
  }
}
