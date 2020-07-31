import { Message } from "discord.js";
import { Bot } from "../Bot";

export abstract class Command {
  // The exact string needed for the command to be executed
  abstract commandName: string;

  // Optional command options
  aliases: Array<string> = [];
  showInHelp: boolean = false;
  helpDescription: string = "";
  helpExamples: Array<string> = [];

  // The function executed when this command is called
  abstract invoke(bot: Bot, message: Message, args: Array<string>): void;
}
