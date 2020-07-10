import { Message } from "discord.js";

export interface Command {
  aliases: Array<string>;
  showInHelp?: boolean;
  helpCommandName?: string;
  helpDescription?: string;
  helpExamples?: Array<string>;
  invoke(message: Message, args: Array<string>): void;
}
