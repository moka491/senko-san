import { ScheduleCommand } from "./schedule";
import { CommandGroup } from "../../core/commands/CommandGroup";

export const ScheduleGroup = new CommandGroup({}, [new ScheduleCommand()]);
