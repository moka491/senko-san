import { PingCommand } from "./ping";
import { CommandGroup } from "../core/CommandGroup";

export const Commands = new CommandGroup([new PingCommand()]);
