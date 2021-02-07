import { Client, ClientOptions } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ConfigHandler } from "./ConfigHandler";

@injectable()
export class Bot extends Client {
  constructor(
    @inject(TYPES.ClientOptions) clientOptions: ClientOptions,
    @inject(TYPES.ConfigHandler) private configHandler: ConfigHandler
  ) {
    super(clientOptions);
  }

  async start(): Promise<void> {
    this.once("ready", this.onceReady.bind(this));
    await this.login(this.configHandler.config.bot.token);
  }

  onceReady(): void {
    console.log("I am ready!");
  }
}
