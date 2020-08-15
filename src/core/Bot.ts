import { Client, Message } from "discord.js";
import { DataHandler } from "./DataHandler";
import { Config } from "./Config";
import { ConfigHandler } from "./ConfigHandler";
import { Commands } from "../commands";
import { Scheduler } from "./Scheduler";

export class Bot {
  public readonly client: Client;
  public readonly dataHandler: DataHandler;
  public readonly configHandler: ConfigHandler;
  public readonly scheduler: Scheduler;
  public readonly config: Config;

  constructor() {
    this.client = new Client({ shards: "auto" });
    this.configHandler = new ConfigHandler().load();
    this.config = this.configHandler.config;

    this.dataHandler = new DataHandler(this.config);
  }

  async start() {
    await this.dataHandler.init().catch((err) => {
      console.error(err);
      process.exit();
    });

    this.client.once("ready", this.onceReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    await this.client.login(this.config.bot.token);
  }

  onceReady() {
    console.log("I am ready!");
  }

  onMessage(msg: Message) {
    if (!msg.content.startsWith(this.config.bot.prefix) || msg.author.bot) {
      return;
    }

    const args = msg.content.slice(this.config.bot.prefix.length).split(/ +/);
    const commandMatch = Commands.findRecursive(args);

    if (commandMatch) {
      const [command, remainingArgs] = commandMatch;
      command.invoke(this, msg, remainingArgs);
    }
  }
}
