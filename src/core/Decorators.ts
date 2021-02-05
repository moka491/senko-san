import { CommandGroupOptions } from "./types/CommandGroup";
import {
  Command as CommandData,
  CommandFunction,
  CommandOptions,
} from "./types/Command";

export const COMMANDS_META_KEY = "commands";
export const COMMAND_GROUP_OPTIONS_META_KEY = "commandGroupOptions";

export const Command = (options: CommandOptions) => {
  return (
    target,
    property,
    descriptor: TypedPropertyDescriptor<CommandFunction>
  ): void => {
    // Acquire class reference from method
    const classTarget =
      typeof target === "object" ? target.constructor : target;

    const methodName = property.toString();

    const commandData: CommandData = {
      originalName: methodName,
      options,
      invoke: descriptor.value,
    };

    // Add new command data to list of commands of this group
    const classCommands =
      Reflect.getMetadata(COMMANDS_META_KEY, classTarget) || [];
    classCommands.push(commandData);

    // Store it alongside other commands in the class metadata
    Reflect.defineMetadata(COMMANDS_META_KEY, classCommands, classTarget);
  };
};

export const CommandGroup = (options: CommandGroupOptions): ClassDecorator => {
  return (target) => {
    // Store CommandGroup options in metadata
    Reflect.defineMetadata(COMMAND_GROUP_OPTIONS_META_KEY, options, target);
  };
};
