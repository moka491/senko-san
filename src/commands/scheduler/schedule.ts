import { Command } from "../../core/commands/Command";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";

const END_CHARS = "(?= to| at| on| next| every| each| mentioning|$)";

const RE_TO_RUN = RegExp('(?<=to run) "(.*?)"' + END_CHARS);
const RE_TO = new RegExp('(?<=to) "(.*?)"' + END_CHARS);
const RE_EVERY = new RegExp("(?<=(every|each))(.*?)" + END_CHARS);
const RE_AT = new RegExp("(?<=at)(.*?)" + END_CHARS);
const RE_NEXT = new RegExp("(?<=next)(.*?)" + END_CHARS);
const RE_MENTIONING = new RegExp("(?<=mentioning)(.*?)" + END_CHARS);

export class ScheduleCommand extends Command {
  commandName = "schedule";

  invoke(bot: Bot, message: Message, args: string[]): void {}
}
