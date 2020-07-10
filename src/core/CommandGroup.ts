import { Command } from "./Command";

export class CommandGroup extends Set<Command> {
  constructor(initialValues: Array<Command>) {
    super(initialValues);
  }

  append(elements: Array<Command>): void {
    elements.forEach(this.add, this);
  }

  find(name: string): Command {
    for (let command of this) {
      if (command?.aliases?.includes(name)) {
        return command;
      }
    }
    return null;
  }
}
