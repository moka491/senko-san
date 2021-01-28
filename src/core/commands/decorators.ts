/* 
@Command("ping")
@Aliases(["pg"])
@Description("Returns you a pong with arguments")
@Examples(["ping a b c", "pg 1 2 3"])
*/
import { CommandOptions } from "./Command";

export function command(commandOptions: CommandOptions) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T): T {
    return class extends constructor {
      options = commandOptions;
    };
  };
}
