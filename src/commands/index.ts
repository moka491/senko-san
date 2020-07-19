import { SystemGroup } from "./system";
import { CommandGroup } from "../core/commands/CommandGroup";

export const Commands = new CommandGroup(
  { groupPrefix: "system" },
  [],
  [SystemGroup]
);
