import { Command } from "./Command";
import { Message } from "discord.js";
import { Bot } from "../Bot";

class TestCommand extends Command {
  commandName = "testCommand";
  aliases = ["TestCommandAlias"];
  helpDescription = "TestDescription";
  invoke(bot: Bot, message: Message, args: string[]): void {
    args.push("AddedArgForTesting");
  }
}

const testCommand = new TestCommand();

describe("Command class", () => {
  it("can have properties assigned to it", () => {
    expect(testCommand.commandName).toBe("testCommand");
    expect(testCommand.aliases).toContainEqual("TestCommandAlias");
    expect(testCommand.helpDescription).toBe("TestDescription");
  });

  it("can be properly invoked", () => {
    // Invoke the command with a variable that is changed
    // within the invoke implementation. If it was changed, the correct invoke function was called
    const args = [];
    testCommand.invoke(null, null, args);

    expect(args.length).toBe(1);
  });
});
