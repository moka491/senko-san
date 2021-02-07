import { Message } from "discord.js";
import { Bot } from "./Bot";
import { Command, CommandArgs } from "./types/Command";
import {
  CommandGroup,
  CommandGroupClass,
  CommandGroupOptions,
} from "./types/CommandGroup";
import {
  COMMANDS_META_KEY,
  COMMAND_GROUP_OPTIONS_META_KEY,
} from "./Decorators";
import { ConfigHandler } from "./ConfigHandler";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

interface CommandTreeNode {
  [name: string]: CommandTreeNode | Command;
}

@injectable()
export class CommandHandler {
  private commandTree: CommandTreeNode;
  private groupTree: CommandGroup[];

  constructor(
    @inject(TYPES.Bot) private bot: Bot,
    @inject(TYPES.ConfigHandler) private configHandler: ConfigHandler,
    @inject(TYPES.CommandGroups) rootCommandGroups: CommandGroupClass[]
  ) {
    this.groupTree = this.buildGroupTreeRecursive(rootCommandGroups);
    this.commandTree = this.buildCommandTreeRecursive(this.groupTree);

    this.bot.on("message", this.handleCommand.bind(this));
  }

  private getCommandGroupOptions(
    commandGroup: CommandGroupClass
  ): CommandGroupOptions {
    const groupOptions: CommandGroupOptions = Reflect.getMetadata(
      COMMAND_GROUP_OPTIONS_META_KEY,
      commandGroup
    );

    if (groupOptions) {
      return groupOptions;
    } else {
      throw `${commandGroup.name} isn't a valid CommandGroup. Make sure to decorate it with the CommandGroup decorator!`;
    }
  }

  private getCommandGroupCommands(commandGroup: CommandGroupClass): Command[] {
    const groupCommands: Command[] = Reflect.getMetadata(
      COMMANDS_META_KEY,
      commandGroup
    );

    return groupCommands || [];
  }

  private buildGroupTreeRecursive(
    commandGroupClasses: CommandGroupClass[]
  ): CommandGroup[] {
    return commandGroupClasses.map((groupClass) => {
      const options = this.getCommandGroupOptions(groupClass);
      const commands = this.getCommandGroupCommands(groupClass);

      return {
        options,
        commands,
        subgroups: this.buildGroupTreeRecursive(options.subgroups || []),
      };
    });
  }

  private buildCommandTreeRecursive(
    commandGroups: CommandGroup[]
  ): CommandTreeNode {
    let subtree: CommandTreeNode = {};

    for (const commandGroup of commandGroups) {
      let groupNode: CommandTreeNode = {};

      // Add each command of group
      for (const command of commandGroup.commands) {
        if (command.options.aliases) {
          for (const commandAlias of command.options.aliases) {
            groupNode[commandAlias] = command;
          }
        }

        groupNode[command.options.name || command.originalName] = command;
      }

      // Recursively add subtrees of subgroups
      if (commandGroup.subgroups.length > 0) {
        groupNode = {
          ...groupNode,
          ...this.buildCommandTreeRecursive(commandGroup.subgroups),
        };
      }

      // Wrap in prefix if given
      if (commandGroup.options.prefix) {
        groupNode = { [commandGroup.options.prefix]: groupNode };
      }

      // Add node to subtree
      subtree = {
        ...subtree,
        ...groupNode,
      };
    }

    return subtree;
  }

  findCommandInTree(
    treeNode: CommandTreeNode,
    commandArgs: string[]
  ): [Command, CommandArgs] {
    const nextNode = treeNode[commandArgs.shift()];

    if (nextNode) {
      if (nextNode.invoke) {
        return [nextNode as Command, commandArgs];
      } else {
        return this.findCommandInTree(nextNode as CommandTreeNode, commandArgs);
      }
    }
  }

  handleCommand(msg: Message): void {
    if (
      !msg.content.startsWith(this.configHandler.config.bot.prefix) ||
      msg.author.bot
    ) {
      return;
    }

    const result = this.findCommandInTree(
      this.commandTree,
      msg.content.substr(this.configHandler.config.bot.prefix.length).split(" ")
    );

    if (result) {
      const [command, args] = result;

      command.invoke(this.bot, msg, args);
    }
  }
}
