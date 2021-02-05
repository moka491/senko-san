import { Client, Message } from "discord.js";
import { DataHandler } from "./DataHandler";
import { Config } from "./Config";
import { ConfigHandler } from "./ConfigHandler";
import { CommandHandler } from "./CommandHandler";
import { SystemGroup } from "../commands/system";

export class Bot {
  private client: Client;
  private dataHandler: DataHandler;
  private commandHandler: CommandHandler;
  private configHandler: ConfigHandler;
  private config: Config;

  constructor() {
    this.client = new Client({ shards: "auto" });
    this.configHandler = new ConfigHandler().load();
    this.config = this.configHandler.config;

    this.dataHandler = new DataHandler(this.config);
    this.commandHandler = new CommandHandler(this, this.config, [SystemGroup]);
  }

  async start(): Promise<void> {
    await this.dataHandler.init();

    this.client.once("ready", this.onceReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    await this.client.login(this.config.bot.token);
  }

  onceReady(): void {
    console.log("I am ready!");
  }

  onMessage(message: Message): void {
    this.commandHandler.handleCommand(message);
  }
}
