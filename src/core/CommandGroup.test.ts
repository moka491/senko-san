import { CommandGroup } from "./CommandGroup";
import { Command } from "./Command";
import { Message } from "discord.js";

class TestCommand extends Command {
  commandName = "TestCommand";
  invoke(message: Message, args: string[]): void {}
}

class TestCommand2 extends Command {
  commandName = "TestCommand2";
  invoke(message: Message, args: string[]): void {}
}

test("Create a new CommandGroup with a Command already added", () => {
  // Create initial Set with one Command already in it
  const group = new CommandGroup({}, [new TestCommand()]);

  // The Set size should now be 1
  expect(group.commands.length).toBe(1);

  // Check if the added Command class can be found
  expect(group.findCommand("TestCommand").commandName).toBe("TestCommand");
});

test("Finding command inside nested CommandGroups with prefixes", () => {
  // Create test commands
  const testCommand = new TestCommand();
  const testCommand2 = new TestCommand2();

  // Create tree structure with some CommandGroups
  // outer => { info[], system[TestCommand] => network[TestCommand2] }
  const systemNetworkGroup = new CommandGroup({ groupPrefix: "network" }, [
    testCommand2,
  ]);
  const systemGroup = new CommandGroup(
    { groupPrefix: "system" },
    [testCommand],
    [systemNetworkGroup]
  );
  const infoGroup = new CommandGroup({ groupPrefix: "info" }, []);
  const outerGroup = new CommandGroup({}, [], [systemGroup, infoGroup]);

  // Expect to find testCommand2 with no arguments left
  expect(
    outerGroup.findRecursive(["system", "network", "TestCommand2"])
  ).toStrictEqual([testCommand2, []]);

  // Expect to find testCommand2 with two other arguments left
  expect(
    outerGroup.findRecursive([
      "system",
      "network",
      "TestCommand2",
      "anotherArg",
      "yetAnotherArg",
    ])
  ).toStrictEqual([testCommand2, ["anotherArg", "yetAnotherArg"]]);

  // Expect to find testCommand with two other arguments left
  expect(
    outerGroup.findRecursive([
      "system",
      "TestCommand",
      "anotherArg",
      "yetAnotherArg",
    ])
  ).toStrictEqual([testCommand, ["anotherArg", "yetAnotherArg"]]);

  // Expect to find nothing in the info group
  expect(outerGroup.findRecursive(["info", "TestCommand"])).toBe(null);

  // Also find nothing if you don't add a command, just a group name
  expect(outerGroup.findRecursive(["info"])).toBe(null);
});
