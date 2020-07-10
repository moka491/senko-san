import { Command } from "./Command";
import { Message } from "discord.js";

class TestCommand extends Command {
  commandName = "testCommand";
  aliases = ["TestCommandAlias"];
  helpDescription = "TestDescription";
  invoke(message: Message, args: string[]): void {
    args.push("AddedArgForTesting");
  }
}

const testCommand = new TestCommand();

test("Command properties are set properly on the extended Command class", () => {
  expect(testCommand.commandName).toBe("testCommand");
  expect(testCommand.aliases).toContainEqual("TestCommandAlias");
  expect(testCommand.helpDescription).toBe("TestDescription");
});

test("Command can be properly invoked", () => {
  // Invoke the command with a variable that is changed
  // within the invoke implementation. If it was changed, the correct invoke function was called
  const args = [];
  testCommand.invoke(null, args);

  expect(args.length).toBe(1);
});
