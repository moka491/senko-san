/* 
@Command("ping")
@Aliases(["pg"])
@Description("Returns you a pong with arguments")
@Examples(["ping a b c", "pg 1 2 3"])
*/

export function command(commandOptions) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      options = commandOptions;
    };
  };
}
