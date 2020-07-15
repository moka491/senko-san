import { Command } from "./Command";

export class CommandGroup {
  constructor(
    private groupOptions: CommandGroupOptions = {},
    private _commands: Array<Command> = [],
    private _subgroups: Array<CommandGroup> = []
  ) {}

  get commands(): Array<Command> {
    return this._commands;
  }

  get subgroups(): Array<CommandGroup> {
    return this._subgroups;
  }

  get groupPrefix(): string {
    return this.groupOptions.groupPrefix;
  }

  findCommand(commandName: string): Command {
    for (let command of this.commands) {
      if (command?.commandName === commandName) {
        return command;
      }
    }
    return null;
  }

  findRecursive(commandArgs: Array<string>): [Command, Array<string>] {
    if (!commandArgs || commandArgs.length < 1) {
      return null;
    }

    // If this group has a prefix, it's expected of all
    // commands targeting this or any subgroup to contain that prefix
    // Thus if the first argument doesn't match this group's prefix, we can stop searching.
    // If it does however, shift it away, as it's not part of the actual command's arguments
    if (this.groupPrefix?.length > 0) {
      if (this.groupPrefix === commandArgs[0]) {
        commandArgs.shift();
      } else {
        return null;
      }
    }

    // Now get the name of the command from the arguments
    let commandName = commandArgs[0];

    // Try to find a command with the retrieved name and return it if found,
    // including the remaining arguments next to it
    const command = this.findCommand(commandName);
    if (command) {
      commandArgs.shift();
      return [command, commandArgs];
    }

    // If not, try to find the command recursively in the inner groups
    for (const subgroup of this.subgroups) {
      const command = subgroup.findRecursive(commandArgs);
      if (command) {
        return command;
      }
    }

    // Return null if no command has been found
    return null;
  }
}

export interface CommandGroupOptions {
  groupPrefix?: string;
}
