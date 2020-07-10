import { SystemGroup } from "./system";
import { CommandGroup } from "../core/CommandGroup";

export const Commands = new CommandGroup(
  { groupPrefix: "system" },
  [],
  [SystemGroup]
);
