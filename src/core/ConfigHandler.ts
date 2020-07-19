import * as fs from "fs";
import * as path from "path";
import * as TOML from "@iarna/toml";
import merge from "lodash.merge";
import { Defaults, Config } from "./Config";

const CONFIG_PATH = path.resolve(__dirname, "../../config/config.toml");

export class ConfigHandler {
  private _config: Config;

  get config(): Config {
    return this._config;
  }

  load(): this {
    // Exit if the user config file doesn't exist
    if (!fs.existsSync(CONFIG_PATH)) {
      console.error(
        "The bot's config file wasn't found. Make sure there's a valid file in " +
          CONFIG_PATH
      );
      process.exit(1);
    }

    // Read the config.toml
    const configToml = fs.readFileSync(CONFIG_PATH, "utf8");

    // Try to parse it and exit on error
    let userConfig;
    try {
      userConfig = TOML.parse(configToml);
    } catch (err) {
      console.error("There's an error in the bot's config file: " + err);
      process.exit(1);
    }

    // Merge the user config with the defaults
    this._config = merge(Defaults, userConfig);

    // Return instance for chaining
    return this;
  }
}
