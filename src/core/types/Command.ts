import { Message } from "discord.js";
import { Bot } from "../Bot";

/**
 * An options object meant to be passed to the Command decorator to set
 * additional options for the decorated Command
 */
export interface CommandOptions {
  name?: string;
  aliases?: string[];
  description?: string;
  examples?: string[];
}

/**
 * An internal object to store parsed Commands
 * as well as references to their defined call functions
 */
export type Command = {
  originalName: string;
  options: CommandOptions;
  invoke: CommandFunction;
};

/**
 * Defines the structure of a valid Command function declaration
 */
export type CommandFunction = (
  bot: Bot,
  msg: Message,
  args: CommandArgs
) => void;

/**
 * Defines the arguments of a Command in a message
 */
export type CommandArgs = string[];
