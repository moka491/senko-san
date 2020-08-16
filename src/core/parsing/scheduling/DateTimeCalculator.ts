import { DateTime, Duration, DurationObject } from "luxon";
import { Weekday } from "./Enums";
import { RegexConsumer } from "../RegexConsumer";

export interface WeekdayInput {
  weekday: Weekday;
}

export interface DurationInput {
  duration: Duration;
}

export interface WeekdayDurationInput {
  weekday?: Weekday;
  duration?: Duration;
}

export class DateTimeCalculator {
  this(input: WeekdayInput): DateTime {
    let date = DateTime.utc();

    // Set weekday to the given one
    date = date.set({ weekday: input.weekday });

    return date;
  }

  next(input: WeekdayDurationInput): DateTime {
    let date = DateTime.utc();

    // If a weekday was given (i.e. next Wednesday)
    if (input.weekday) {
      date = date
        // Add one week to be in next week
        .plus({ week: 1 })
        // Set week day to the given one
        .set({ weekday: input.weekday });

      // If a duration was given (i.e. next month)
    } else if (input.duration) {
      date = date.plus(input.duration);
    }

    return date;
  }

  in(input: DurationInput): DateTime {
    let date = DateTime.utc();

    return date.plus(input.duration);
  }

  every(input: WeekdayDurationInput, iterations: number = 100): DateTime[] {
    const resultingDates: DateTime[] = [];

    let date = DateTime.utc();

    if (input.weekday) {
      date = date.set({ weekday: input.weekday });

      for (let i = 1; i <= iterations; i++) {
        const calculatedDate = date.plus({ week: i });
        resultingDates.push(calculatedDate);
      }
    } else if (input.duration) {
      for (let i = 1; i <= iterations; i++) {
        const scaledDuration = input.duration.mapUnits((x) => x * i);
        const calculatedDate = date.plus(scaledDuration);

        resultingDates.push(calculatedDate);
      }
    }

    return resultingDates;
  }
}

/* 
how to parse:

this [weekday]
next [weekday/unit]
every/each + [weekday/unit/number + unit]
in + [number + unit]

on "this":
- take current dateTime in luxon
- set weekday to supplied index

on "next":
- take current dateTime in luxon
- set weekday if supplied
- on weekday: add +1 week to select next week
- on unit: add +1 of the unit

on "in":
- take current dateTime in luxon
- add supplied number and unit to the date

on "every/each":
- on weekday/unit: do the same as "next"
- on numbered unit: do the same thing as "in"
- find the next N iterations of either and schedule all of them


*/
