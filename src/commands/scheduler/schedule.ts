import { Command } from "../../core/commands/Command";
import { Message } from "discord.js";
import { Bot } from "../../core/Bot";
import { command } from "../../core/commands/decorators";
import { RegexConsumer } from "../../core/parsing/RegexConsumer";
import { ScheduleJob } from "../../core/models/scheduler/ScheduleJob";
import Cron from "../../core/parsing/Cron";

const END_CHARS = "(?= to| at| on| in| next| every| each| mentioning|$)";

const RE_COMMAND = new RegExp('(to run)\\s+"(.*?)"' + END_CHARS);
const RE_REMIND_MSG = new RegExp('(to)\\s+"(.*?)"' + END_CHARS);
const RE_RECURRING_DATE_CMD = new RegExp("(every|each)\\s+(.*?)" + END_CHARS);
const RE_FIXED_DATE_CMD = new RegExp("(on)\\s+(.*?)" + END_CHARS);
const RE_NEXT_DATE_CMD = new RegExp("(next)\\s+(.*?)" + END_CHARS);
const RE_TIME = new RegExp("(at)\\s+(.*?)" + END_CHARS);
const RE_CHANNEL = new RegExp("(in)\\s+(.*?)" + END_CHARS);
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
  let cronRule: Cron;
  let fixedDate: Date;
  let channelId;
  let mentionUserIds;

  // Create the consumer instance to extract info from the command string
  const re = new RegexConsumer(args.join(" "));

  // -schedule every Monday at 20:00 to run "say hello world" mentioning me and @User1
  // Parse all elements of the command
  const reminderCommandArg = re.get(RE_COMMAND, 2); // say hello world
  const reminderMessage = re.get(RE_REMIND_MSG, 2); // undefined

  const recurringUnitArg = re.get(RE_RECURRING_DATE_CMD, 2); // Monday
  const nextUnitArg = re.get(RE_NEXT_DATE_CMD, 2); // undefined
  const fixedDateArg = re.get(RE_FIXED_DATE_CMD, 2); // undefined

  const timeArg = re.get(RE_TIME, 2); // 20:00
  const channelArg = re.get(RE_CHANNEL, 2); // undefined
  const mentioningUsersArg = re.get(RE_MENTIONING_LIST, 2); // me and @User1

  if (recurringUnitArg) {
    // Create cron rule out of the available inputs, in this case the recurringUnitArg
    // (can be weekday, or seconds/minutes/hours etc)
    cronRule = {
      ...cronRule,
      ...parseWeekDayToCron(recurringUnitArg),
      ...parseTimeUnitToCron(recurringUnitArg),
      ...parseTimeToCron(timeArg),
    };

    // Set flag to not remove this job after the first run
    isRecurring = true;

    // parse time and overwrite cron numbers
  } else if (nextUnitArg) {
    // Create cron rule out of the available inputs, in this case the nextUnitArg
    // (can be weekday, or seconds/minutes/hours etc)
    cronRule = {
      ...cronRule,
      ...parseWeekDayToCron(nextUnitArg),
      ...parseTimeUnitToCron(nextUnitArg),
      ...parseTimeToCron(timeArg),
    };
  } else if (fixedDateArg) {
    // try parsing the dateArg itself and set fixedDate
    fixedDate = parseDateAndTime(fixedDateArg, timeArg);
  }

  channelId = parseChannelId(channelArg);
  mentionUserIds = parseUserList(mentioningUsersArg, msg.author.id);

  msg.reply(
    JSON.stringify(
      {
        isRecurring,
        cronRule,
        fixedDate,
        channelId,
        mentionUserIds,
      },
      null,
      4
    )
  );
}

function parseWeekDayToCron(input: string): Cron {
  const index = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].indexOf(input.toLowerCase());
  return index > -1 ? { dayOfWeek: `${index}` } : {};
}

function parseTimeUnitToCron(input: string): Cron {
  // Prepare input string
  input = input.toLowerCase().trim();

  // Remove number(s) from string and store it in step, or use 1 if none is given
  const step = parseInt(input.replace(/^\D+/g, "")) || 1;
  input = input.trim();

  switch (input) {
    case "second":
    case "seconds":
      return { second: `*/${step}` };
    case "minute":
    case "minutes":
      return { second: "0", minute: `*/${step}` };
    case "hour":
    case "hours":
      return { second: "0", minute: "0", hour: `*/${step}` };
    case "day":
    case "days":
      return { second: "0", minute: "0", hour: "0", dayOfWeek: `*/${step}` };
    case "month":
    case "months":
      return {
        second: "0",
        minute: "0",
        hour: "0",
        dayOfMonth: "1", // todo perhaps current day of month
        month: `*/${step}`,
        dayOfWeek: "*",
      };
    case "year":
      return {
        second: "0",
        minute: "0",
        hour: "0",
        dayOfMonth: "1",
        month: "1",
        dayOfWeek: "*",
      };
  }

  return {};
}

function parseTimeArg(input: string): [number, number] {
  // Prepare input string
  input = input.toLowerCase().trim();

  const timeParts = input.split(":");

  let hour = parseInt(timeParts[0]) || 0;
  let minute = parseInt(timeParts[1]) || 0;

  if (input.includes("pm")) {
    hour += 12;
  }

  return [hour, minute];
}

function parseTimeToCron(input: string): Cron {
  const [hour, minute] = parseTimeArg(input);
  return { minute: `${minute}`, hour: `${hour}` };
}

function parseDateAndTime(dateArg: string, timeArg: string) {
  dateArg = dateArg.toLowerCase().trim();

  const parsedDate = new Date(dateArg);
  if (parsedDate) {
    if (timeArg) {
      const [hour, minute] = parseTimeArg(timeArg);
      parsedDate.setUTCHours(hour);
      parsedDate.setUTCMinutes(minute);
    }

    return parsedDate;
  }

  return null;
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
