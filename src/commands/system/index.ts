import { PingCommand } from "./ping";
import { CommandGroup } from "../../core/commands/CommandGroup";

export const SystemGroup = new CommandGroup({ groupPrefix: "network" }, [
  new PingCommand(),
]);
