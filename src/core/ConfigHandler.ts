import * as TOML from "@iarna/toml";
import * as fs from "fs";
import { injectable } from "inversify";
import merge from "lodash.merge";
import * as path from "path";
import { Config, Defaults } from "./Config";

const CONFIG_PATH = path.resolve(__dirname, "../../config/config.toml");

@injectable()
export class ConfigHandler {
  private _config: Config;

  constructor() {
    this.loadConfig();
  }

  loadConfig(): void {
    // Exit if the user config file doesn't exist
    if (!fs.existsSync(CONFIG_PATH)) {
      throw Error(
        "The bot's config file wasn't found. Make sure there's a valid file in " +
          CONFIG_PATH
      );
    }

    // Read the config.toml
    const configToml = fs.readFileSync(CONFIG_PATH, "utf8");

    // Try to parse it and exit on error
    let userConfig: TOML.JsonMap;
    try {
      userConfig = TOML.parse(configToml);
    } catch (err) {
      throw Error("There's an error in the bot's config file: " + err.message);
    }

    // Merge the user config with the defaults
    this._config = merge(Defaults, userConfig);
  }

  get config(): Config {
    return this._config;
  }
}
