import { Client, Message } from "discord.js";
import { DataHandler } from "./DataHandler";
import { Config } from "./Config";
import { ConfigHandler } from "./ConfigHandler";
import { Commands } from "../commands";

export class Bot {
  private client: Client;
  private dataHandler: DataHandler;
  private configHandler: ConfigHandler;
  private config: Config;

  constructor() {
    this.client = new Client({ shards: "auto" });
    this.configHandler = new ConfigHandler().load();
    this.config = this.configHandler.config;

    this.dataHandler = new DataHandler(this.config);
  }

  async start() {
    await this.dataHandler.init();

    this.client.once("ready", this.onceReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    await this.client.login(this.config.bot.token);
  }

  onceReady() {
    console.log("I am ready!");
  }

  onMessage(message: Message) {
    if (
      !message.content.startsWith(this.config.bot.prefix) ||
      message.author.bot
    ) {
      return;
    }

    const args = message.content
      .slice(this.config.bot.prefix.length)
      .split(/ +/);
    const commandMatch = Commands.findRecursive(args);

    if (commandMatch) {
      const [command, remainingArgs] = commandMatch;
      command.invoke(this, message, remainingArgs);
    }
  }
}
