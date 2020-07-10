import { CommandGroup } from "./CommandGroup";
import { Command } from "./Command";
import { Message } from "discord.js";

class TestCommand implements Command {
  aliases = ["TestCommand"];
  invoke(message: Message, args: string[]): void {}
}

class TestCommand2 implements Command {
  aliases = ["TestCommand2"];
  invoke(message: Message, args: string[]): void {}
}

const testCommand1 = new TestCommand();
const testCommand2 = new TestCommand2();

test("Create a new CommandGroup with a Command already added", () => {
  // Create initial Set with one Command already in it
  const set = new CommandGroup([testCommand1]);

  // The Set size should now be 1
  expect(set.size).toBe(1);

  // Check if the added Command class can be found
  expect(set.find("TestCommand").aliases).toContainEqual("TestCommand");
});

test("Add a new list of Commands to a CommandGroup", () => {
  // Create initial Set with one Command already in it
  const set = new CommandGroup([testCommand1]);

  // Append second Command, the Set size should now be 2
  set.append([testCommand2]);
  expect(set.size).toBe(2);

  // Check if the second Command class is found
  expect(set.find("TestCommand2").aliases).toContainEqual("TestCommand2");
});
