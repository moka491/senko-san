import { Command, CommandGroup } from "../../core/Decorators";
import { Bot } from "../../core/Bot";
import { Message } from "discord.js";

@CommandGroup({
  prefix: "stuff",
})
export class StuffGroup {
  @Command({
    aliases: ["yo"],
  })
  hello(bot: Bot, message: Message, args: string[]): void {
    return;
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
  ping(bot: Bot, message: Message, args: string[]): void {
    return;
  }
}
