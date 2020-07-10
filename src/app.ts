import { Client, Collection } from "discord.js";
import { Commands } from "./commands";

const { prefix, token } = require("../config.json");

const client = new Client({ shards: "auto" });

client.once("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandMatch = Commands.findRecursive(args);

  if (commandMatch) {
    const [command, remainingArgs] = commandMatch;
    command.invoke(message, remainingArgs);
  }
});

client.login(token);
