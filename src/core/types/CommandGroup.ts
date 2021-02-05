import { Command } from "./Command";

/**
 * An options object meant to be passed to the CommandGroup decorator to set
 * additional options for the decorated CommandGroup
 */
export interface CommandGroupOptions {
  prefix?: string;
  subgroups?: CommandGroupClass[];
}

/**
 * An internal object to store parsed CommandGroups,
 * their contained Commands and any defined subgroups
 */
export type CommandGroup = {
  options: CommandGroupOptions;
  commands: Command[];
  subgroups?: CommandGroup[];
};

/**
 * Defines the type of a Class decorated by a CommandGroup decorator
 */
export type CommandGroupClass = new (...args: any[]) => any;
