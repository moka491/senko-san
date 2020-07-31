import { Command } from "../../core/commands/Command";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";

export class PingCommand extends Command {
  commandName = "ping";

  invoke(bot: Bot, message: Message, args: string[]): void {
    message.reply("Pong with args: " + args);
  }
}
