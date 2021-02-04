import { CommandGroupOptions } from "./types/CommandGroup";
import { Command as CommandData, CommandOptions } from "./types/Command";
import "reflect-metadata";

export const COMMANDS_META_KEY = "commands";
export const COMMAND_GROUP_OPTIONS_META_KEY = "commandGroupOptions";

export const Command = (options: CommandOptions): MethodDecorator => {
  return (target, property, descriptor: PropertyDescriptor) => {
    // Acquire class reference from method
    const classTarget =
      typeof target === "object" ? target.constructor : target;

    const methodName = property.toString();

    const commandData: CommandData = {
      originalName: methodName,
      options,
      invoke: descriptor.value,
    };

    // Add new command info to list of commands of this group
    const classCommands =
      Reflect.getMetadata(COMMANDS_META_KEY, classTarget) || [];
    classCommands[methodName] = commandData;

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
