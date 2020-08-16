import { Command } from "../../core/commands/Command";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";
import { command } from "../../core/commands/decorators";
import { RegexConsumer } from "../../core/parsing/RegexConsumer";
import { ScheduleJob } from "../../core/models/scheduler/ScheduleJob";
import Cron from "../../core/parsing/Cron";
import { DateTimeArgumentParser } from "../../core/parsing/scheduling/DateTimeArgumentParser";

const END_CHARS = "(?= to| at| on| in| next| every| each| mentioning|$)";

const RE_COMMAND = new RegExp('(to run)\\s+"(.*?)"' + END_CHARS);
const RE_REMIND_MSG = new RegExp('(to)\\s+"(.*?)"' + END_CHARS);
const RE_CHANNEL = new RegExp("(in channel)\\s+(.*?)" + END_CHARS);
const RE_RECURRING_DATE_CMD = new RegExp("(every|each)\\s+(.*?)" + END_CHARS);
const RE_FIXED_DATE_CMD = new RegExp("(on)\\s+(.*?)" + END_CHARS);
const RE_THIS_DATE_CMD = new RegExp("(this)\\s+(.*?)" + END_CHARS);
const RE_NEXT_DATE_CMD = new RegExp("(next)\\s+(.*?)" + END_CHARS);
const RE_IN_DATE_CMD = new RegExp("(in)\\s+(.*?)" + END_CHARS);
const RE_TIME = new RegExp("(at)\\s+(.*?)" + END_CHARS);

const RE_MENTIONING_LIST = new RegExp("(mentioning)\\s+(.*?)" + END_CHARS);

@command({
  name: "schedule",
  description: "Schedule a command or a reminder",
  examples: [
    'schedule every Monday at 20:00 to run "say hello world" mentioning me and @User1',
  ],
})
export class ScheduleCommand extends Command {
  invoke(bot: Bot, msg: Message, args: string[]): void {
    processCommand(bot, msg, args, false);
  }
}

@command({
  name: "remind",
  description: "Remind you and others of something",
  examples: ['remind me and @User1 next Monday at 2pm to "watch saki"'],
})
export class RemindCommand extends Command {
  invoke(bot: Bot, msg: Message, args: string[]): void {
    processCommand(bot, msg, args, true);
  }
}

function processCommand(
  bot: Bot,
  msg: Message,
  args: string[],
  isReminder: boolean
) {
  // Define some flags to set during parsing
  let isRecurring: boolean = false;
  let channelId;
  let mentionUserIds;

  // Create the consumer instance to extract info from the command string
  const re = new RegexConsumer(args.join(" "));

  // -schedule every Monday at 20:00 to run "say hello world" mentioning me and @User1
  // Parse all elements of the command
  const [reminderCommandArg] = re.get(RE_COMMAND, [1, 2]); // say hello world
  const [reminderMessage] = re.get(RE_REMIND_MSG, [2]); // undefined

  const [recurringUnitArg] = re.get(RE_RECURRING_DATE_CMD, [2]); // Monday
  const [nextUnitArg] = re.get(RE_NEXT_DATE_CMD, [2]); // undefined
  const [fixedDateArg] = re.get(RE_FIXED_DATE_CMD, [2]); // undefined

  const [timeArg] = re.get(RE_TIME, [2]); // 20:00
  const [channelArg] = re.get(RE_CHANNEL, [2]); // undefined
  const [mentioningUsersArg] = re.get(RE_MENTIONING_LIST, [2]); // me and @User1

  if (recurringUnitArg) {
    const parsedWeekday = DateTimeArgumentParser.parseWeekday(recurringUnitArg);
    const parsedDuration = DateTimeArgumentParser.parseTimeUnitArgument(
      recurringUnitArg
    );
  }
}

function parseChannelId(input: string) {
  return input?.replace(/[^0-9]+/g, "");
}

function parseUserList(input: string, ownUserId: string) {
  const rawUserStrings = input.split(/\s*(?:and|,)+\s*/);
  const userIds = new Set<string>();

  // format the raw strings into id strings and replace 'me' with ownUserId
  for (let userString of rawUserStrings) {
    if (userString.toLowerCase() === "me") {
      userIds.add(ownUserId);
    } else {
      const parsedId = userString.replace(/[^0-9]/g, "");
      if (parsedId.length > 16) {
        userIds.add(parsedId);
      }
    }
  }

  return Array.from(userIds);
}
