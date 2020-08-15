import { SystemGroup } from "./system";
import { CommandGroup } from "../core/commands/CommandGroup";
import { ScheduleGroup } from "./scheduler";

export const Commands = new CommandGroup({}, [], [SystemGroup, ScheduleGroup]);
