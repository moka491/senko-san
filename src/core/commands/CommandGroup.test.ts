import { CommandGroup } from "./CommandGroup";
import { Command } from "./Command";
import { Message } from "discord.js";
import { Bot } from "../Bot";

class TestCommand extends Command {
  commandName = "TestCommand";
  invoke(bot: Bot, message: Message, args: string[]): void {}
}

class TestCommand2 extends Command {
  commandName = "TestCommand2";
  invoke(bot: Bot, message: Message, args: string[]): void {}
}

describe("CommandGroup class", () => {
  it("can be instantiated with default options", () => {
    // Create a group using the default constructor values
    const defaultGroup = new CommandGroup();

    expect(defaultGroup.commands.length).toBe(0);

    expect(defaultGroup.groupPrefix).toBe(undefined);
  });

  it("can be instantiated with already added commands", () => {
    // Create initial Set with one Command already in it
    const group = new CommandGroup({}, [new TestCommand()]);

    // The Set size should now be 1
    expect(group.commands.length).toBe(1);

    // Check if the added Command class can be found
    expect(group.findCommand("TestCommand").commandName).toBe("TestCommand");
  });

  it("can find a command recursively", () => {
    // Create test commands
    const testCommand = new TestCommand();
    const testCommand2 = new TestCommand2();

    // Create tree structure with some CommandGroups
    // outer => { info[], errorous[null], system[TestCommand] => network[TestCommand2] }
    const systemNetworkGroup = new CommandGroup({ groupPrefix: "network" }, [
      testCommand2,
    ]);
    const systemGroup = new CommandGroup(
      { groupPrefix: "system" },
      [testCommand],
      [systemNetworkGroup]
    );
    const infoGroup = new CommandGroup({ groupPrefix: "info" }, []);
    const errorousGroup = new CommandGroup({}, [null]);
    const outerGroup = new CommandGroup(
      {},
      [],
      [systemGroup, infoGroup, errorousGroup]
    );

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

    // An empty array or any other type of argument will return null;
    expect(outerGroup.findRecursive(null)).toBe(null);
  });
});
