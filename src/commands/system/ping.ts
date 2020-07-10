import { Command } from "../../core/Command";
import { Message } from "discord.js";

export class PingCommand extends Command {
  commandName = "ping";

  invoke(message: Message, args: string[]): void {
    message.reply("Pong with args: " + args);
  }
}
