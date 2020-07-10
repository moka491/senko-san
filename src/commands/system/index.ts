import { PingCommand } from "./ping";
import { CommandGroup } from "../../core/CommandGroup";

export const SystemGroup = new CommandGroup({ groupPrefix: "network" }, [
  new PingCommand(),
]);
