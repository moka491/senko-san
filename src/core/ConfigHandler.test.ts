import { ConfigHandler } from "./ConfigHandler";
import mock from "mock-fs";
import path from "path";

const configHandler = new ConfigHandler();

const MOCK_CONFIG_FULL = `
[bot]
token = "testtoken"
prefix = "testprefix"

[database]
hostname = "testhost"
database = "testdb"
username = "testuser"
password = "testpassword"
port = 1234
`;

const MOCK_CONFIG_INVALID = `
[bot
prefix = "testprefix"
`;

afterAll(() => {
  // Restore fs module
  mock.restore();
});

describe("Config Handler", () => {
  it("should load the config file properly", () => {
    // Inject full config into mock-fs
    mock({
      [path.resolve(__dirname, "../../config/config.toml")]: MOCK_CONFIG_FULL,
    });

    // Load the config
    configHandler.load();

    expect(configHandler.config).toBeDefined();
  });

  it("should fail if the config is not found", () => {
    // Mock an empty config folder
    mock({
      [path.resolve(__dirname, "../../config")]: {},
    });

    expect(configHandler.load).toThrowError(
      /The bot's config file wasn't found/
    );
  });

  it("should fail if the config file has invalid syntax", () => {
    // Inject full config into mock-fs
    mock({
      [path.resolve(
        __dirname,
        "../../config/config.toml"
      )]: MOCK_CONFIG_INVALID,
    });

    expect(configHandler.load).toThrowError(
      /There's an error in the bot's config file/
    );
  });
});
