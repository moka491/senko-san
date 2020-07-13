import { Client, Collection } from "discord.js";
import { Commands } from "./commands";
import { config } from "./core/config";

const client = new Client({ shards: "auto" });

client.once("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", (message) => {
  if (!message.content.startsWith(config.bot.prefix) || message.author.bot)
    return;

  const args = message.content.slice(config.bot.prefix.length).split(/ +/);
  const commandMatch = Commands.findRecursive(args);

  if (commandMatch) {
    const [command, remainingArgs] = commandMatch;
    command.invoke(message, remainingArgs);
  }
});

client.login(config.bot.token);
