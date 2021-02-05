import { Command, CommandGroup } from "../../core/Decorators";
import { Bot } from "../../core/Bot";
import { Message } from "discord.js";
import { CommandArgs } from "../../core/types/Command";

@CommandGroup({
  prefix: "stuff",
})
export class StuffGroup {
  @Command({
    aliases: ["yo"],
  })
  hello(bot: Bot, message: Message, args: CommandArgs): void {
    message.reply("Yo boi! Y'all messaged me with " + args);
  }
}

@CommandGroup({
  prefix: "system",
  subgroups: [StuffGroup],
})
export class SystemGroup {
  @Command({
    aliases: ["pong"],
  })
  ping(bot: Bot, message: Message, args: CommandArgs): void {
    message.reply("pang!");
  }
}
