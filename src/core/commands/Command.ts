import { Message } from "discord.js";
import { Bot } from "../Bot";

export abstract class Command {
  options: CommandOptions;

  // The function executed when this command is called
  abstract invoke(bot: Bot, message: Message, args: Array<string>): void;
}

export interface CommandOptions {
  name: string;
  aliases?: string[];
  description?: string;
  examples?: string[];
}
