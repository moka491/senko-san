import { Duration } from "luxon";
import { Weekday } from "./Enums";

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export interface WeekdayInput {
  weekday: Weekday;
  at: Time;
}

export interface DurationInput {
  duration: Duration;
  at: Time;
}

export interface WeekdayDurationInput {
  weekday?: Weekday;
  duration?: Duration;
  at: Time;
}
