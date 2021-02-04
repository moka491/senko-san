import { Command } from "./Command";

export interface CommandGroupOptions {
  prefix?: string;
  subgroups?: CommandGroupClass[];
}

export type CommandGroup = {
  options: CommandGroupOptions;
  commands: Command[];
  subgroups?: CommandGroup[];
};

export type CommandGroupClass = new (...args: any[]) => any;
