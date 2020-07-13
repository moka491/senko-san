import * as fs from "fs";
import * as path from "path";
import merge from "lodash.merge";
import * as TOML from "@iarna/toml";

import defaultConfig from "./defaults.json";

// relative paths are ugly, but what can you do in node.js
const configPath = path.resolve(__dirname, "../../../config/config.toml");

// Exit if the user config file doesn't exist
if (!fs.existsSync(configPath)) {
  console.error(
    "The bot's config file wasn't found. Make sure there's a valid file in " +
      configPath
  );
  process.exit(1);
}

// Read the config.toml
const configToml = fs.readFileSync(configPath, "utf8");

// Try to parse it and exit on error
let userConfig;
try {
  userConfig = TOML.parse(configToml);
} catch (err) {
  console.error("There's an error in the bot's config file: " + err);
  process.exit(1);
}

// Merge the user config with the defaults
const config = merge(defaultConfig, userConfig);

export { config };
