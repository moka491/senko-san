import { Command } from "../../core/commands/Command";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";
import { command } from "../../core/commands/decorators";
import { RegexConsumer } from "../../core/parsing/RegexConsumer";
import { ScheduleParser } from "../../core/parsing/scheduling/ScheduleParser";
import { DateTimeCalculator } from "../../core/parsing/scheduling/DateTimeCalculator";
import { Time } from "../../core/parsing/scheduling/Interfaces";

const END_CHARS = '(?= "| to| at| on| in| next| every| each| mentioning|$)';

const RE_COMMAND = new RegExp('(to run)\\s+"(.*?)"' + END_CHARS);
const RE_REMINDER = new RegExp('(to)\\s+"(.*?)"' + END_CHARS);
const RE_CHANNEL = new RegExp("(in channel)\\s+(.*?)" + END_CHARS);
const RE_EVERY = new RegExp("(every|each)\\s+(.*?)" + END_CHARS);
const RE_ON = new RegExp("(on)\\s+(.*?)" + END_CHARS);
const RE_THIS = new RegExp("(this)\\s+(.*?)" + END_CHARS);
const RE_NEXT = new RegExp("(next)\\s+(.*?)" + END_CHARS);
const RE_IN = new RegExp("(in)\\s+(.*?)" + END_CHARS);
const RE_AT = new RegExp("(at)\\s+(.*?)" + END_CHARS);

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
  let calculatedDates = [];
  let mentionUserIds = [];
  let inChannelId;

  // Create the consumer instance to extract info from the command string
  const re = new RegexConsumer(args.join(" "));

  // Parse all elements of the command
  const [commandArg] = re.get(RE_COMMAND, [1, 2]); // say hello world
  const [reminderArg] = re.get(RE_REMINDER, [2]); // undefined

  const [channelArg] = re.get(RE_CHANNEL, [2]); // undefined
  const [mentioningArg] = re.get(RE_MENTIONING_LIST, [2]); // me and @User1

  const [everyArg] = re.get(RE_EVERY, [2]); // Monday
  const [nextArg] = re.get(RE_NEXT, [2]); // undefined
  const [thisArg] = re.get(RE_THIS, [2]); // undefined
  const [inArg] = re.get(RE_IN, [2]); // undefined
  const [onArg] = re.get(RE_ON, [2]); // undefined

  const [atTimeArg] = re.get(RE_AT, [2]); // 20:00

  // Parse list of users to mention, if it was given
  mentionUserIds = mentioningArg
    ? ScheduleParser.parseUserList(mentioningArg, msg.author.id)
    : [];

  // Parse the channel id to notify in, if it was given. Otherwise use the current channel
  inChannelId = channelArg
    ? ScheduleParser.parseChannelId(channelArg)
    : msg.channel.id;

  let time: Time;
  if (atTimeArg) {
    time = ScheduleParser.parseTimeArgument(atTimeArg);
  }

  // on "every Monday" or "every two minutes"
  if (everyArg) {
    const weekday = ScheduleParser.parseWeekday(everyArg);

    if (weekday) {
      calculatedDates = DateTimeCalculator.every({ weekday, at: time });
    } else {
      const duration = ScheduleParser.parseTimeUnitArgument(everyArg);
      calculatedDates = DateTimeCalculator.every({ duration, at: time });
    }

    // on "this Monday"
  } else if (thisArg) {
    const weekday = ScheduleParser.parseWeekday(thisArg);
    calculatedDates = [DateTimeCalculator.this({ weekday, at: time })];

    // on "next Monday" or "next minute/week/month/etc"
  } else if (nextArg) {
    const weekday = ScheduleParser.parseWeekday(nextArg);
    if (weekday) {
      calculatedDates = [DateTimeCalculator.next({ weekday, at: time })];
    } else {
      const duration = ScheduleParser.parseTimeUnitArgument(nextArg);
      calculatedDates = [DateTimeCalculator.next({ duration, at: time })];
    }

    // on "in 3 weeks"
  } else if (inArg) {
    const duration = ScheduleParser.parseTimeUnitArgument(inArg);
    calculatedDates = [DateTimeCalculator.in({ duration, at: time })];

    // on "on 2020-08-13"
  } else if (onArg) {
    const parsedDate = ScheduleParser.parseDateArgument(onArg);

    // if (parsedDate.isValid) {
    //   calculatedDates = [parsedDate];
    // }
  }

  console.log(calculatedDates.slice(0, 5));

  
}
