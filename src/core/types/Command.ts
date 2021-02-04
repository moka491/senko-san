export interface CommandOptions {
  name?: string;
  aliases?: string[];
  description?: string;
  examples?: string[];
}

export type Command = {
  originalName: string;
  options: CommandOptions;
  invoke: (...args: any[]) => void;
};
