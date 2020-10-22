import { DateTime, Duration, DurationObject } from "luxon";
import { Weekday } from "./Enums";
import { RegexConsumer } from "../RegexConsumer";
import { Time } from "./Interfaces";

export class ScheduleParser {
  static parseWeekday(input: string): Weekday | null {
    return Weekday[input.toUpperCase()] || null;
  }

  static parseTimeUnitArgument(input: string): Duration | null {
    const re = new RegexConsumer(input);

    const [hasSeconds, seconds] = re.get(/(?:(\d+)\s|^)second/, [0, 1]);
    const [hasMinutes, minutes] = re.get(/(?:(\d+)\s|^)minute/, [0, 1]);
    const [hasHours, hours] = re.get(/(?:(\d+)\s|^)hour/, [0, 1]);
    const [hasDays, days] = re.get(/(?:(\d+)\s|^)day/, [0, 1]);
    const [hasWeeks, weeks] = re.get(/(?:(\d+)\s|^)week/, [0, 1]);
    const [hasMonths, months] = re.get(/(?:(\d+)\s|^)month/, [0, 1]);
    const [hasYears, years] = re.get(/(?:(\d+)\s|^)year/, [0, 1]);

    const durationObject: DurationObject = {
      ...(hasSeconds && { seconds: parseInt(seconds) || 1 }),
      ...(hasMinutes && { minutes: parseInt(minutes) || 1 }),
      ...(hasHours && { hours: parseInt(hours) || 1 }),
      ...(hasDays && { days: parseInt(days) || 1 }),
      ...(hasWeeks && { weeks: parseInt(weeks) || 1 }),
      ...(hasMonths && { months: parseInt(months) || 1 }),
      ...(hasYears && { years: parseInt(years) || 1 }),
    };

    const duration = Duration.fromObject(durationObject);
    return duration.isValid ? duration : null;
  }

  static parseTimeArgument(input: string): Time {
    if (!input) {
      return null;
    }

    const re = new RegexConsumer(input);

    const [
      hourArg,
      minuteArg,
      secondArg,
    ] = re.get(/([0-1][0-9]|[2][0-3]):?([0-5][0-9])?:?([0-5][0-9])?/, [
      1,
      2,
      3,
    ]);

    let hour = parseInt(hourArg) || 0;
    const minute = parseInt(minuteArg) || 0;
    const second = parseInt(secondArg) || 0;

    if (input.includes("pm")) {
      hour += 12;
    }

    return { hour, minute, second };
  }

  static parseDateArgument(input: string) {
    return DateTime.fromISO(input);
  }

  static parseChannelId(input: string) {
    return input?.replace(/[^0-9]+/g, "");
  }

  static parseUserList(input: string, ownUserId: string) {
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
}