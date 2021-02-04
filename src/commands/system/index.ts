import { Command, CommandGroup } from "../../core/Decorators";
import { Bot } from "../../core/Bot";
import { Message } from "discord.js";

@CommandGroup({
  prefix: "system",
})
export class SystemGroup {
  @Command({
    aliases: ["pong"],
  })
  ping(bot: Bot, message: Message, args: string[]): void {
    return;
  }
}
