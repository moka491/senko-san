import { Client, Message } from "discord.js";
import { singleton } from "tsyringe";
import { SystemGroup } from "../commands/system";
import { CommandHandler } from "./CommandHandler";
import { ConfigHandler } from "./ConfigHandler";
import { DataHandler } from "./DataHandler";

@singleton()
export class Bot {
  private client: Client;

  constructor(
    private configHandler: ConfigHandler,
    private dataHandler: DataHandler,
    private commandHandler: CommandHandler
  ) {
    this.client = new Client({ shards: "auto" });
    this.commandHandler.loadCommands([SystemGroup]);
  }

  async start(): Promise<void> {
    await this.dataHandler.init();

    this.client.once("ready", this.onceReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    await this.client.login(this.configHandler.config.bot.token);
  }

  onceReady(): void {
    console.log("I am ready!");
  }

  onMessage(message: Message): void {
    this.commandHandler.handleCommand(message);
  }
}
