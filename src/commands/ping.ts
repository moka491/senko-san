import { Command } from "../core/Command";
import { Message } from "discord.js";

export class PingCommand implements Command {
  aliases = ["ping"];

  invoke(message: Message, args: string[]): void {
    message.reply("Pong");
  }
}
