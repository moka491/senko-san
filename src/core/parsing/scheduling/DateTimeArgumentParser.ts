import { Duration, DurationObject } from "luxon";
import { Weekday } from "./Enums";
import { RegexConsumer } from "../RegexConsumer";

export interface Time24h {
  hour: number;
  minute: number;
  second: number;
}

export class DateTimeArgumentParser {
  static parseWeekday(input: string): Weekday | null {
    return Weekday[input.toUpperCase()] || null;
  }

  static parseTimeUnitArgument(input: string): Duration | null {
    const re = new RegexConsumer(input);

    const [seconds] = re.get(/(\d*)\s*second/, [1]);
    const [minutes] = re.get(/(\d*)\s*minute/, [1]);
    const [hours] = re.get(/(\d*)\s*hour/, [1]);
    const [days] = re.get(/(\d*)\s*day/, [1]);
    const [weeks] = re.get(/(\d*)\s*week/, [1]);
    const [months] = re.get(/(\d*)\s*month/, [1]);
    const [years] = re.get(/(\d*)\s*year/, [1]);

    //todo: how to parse week without number. how to handle optional groups in regexconsumer

    const durationObject: DurationObject = {
      ...(seconds && { seconds: parseInt(seconds) || 1 }),
      ...(minutes && { minutes: parseInt(minutes) || 1 }),
      ...(hours && { hours: parseInt(hours) || 1 }),
      ...(days && { days: parseInt(days) || 1 }),
      ...(weeks && { weeks: parseInt(weeks) || 1 }),
      ...(months && { months: parseInt(months) || 1 }),
      ...(years && { years: parseInt(years) || 1 }),
    };

    const duration = Duration.fromObject(durationObject);

    return duration.isValid ? duration : null;
  }

  static parseTimeArgument(input: string): Time24h {
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
}
