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
  const commandName = args.shift().toLowerCase();

  const Command = Commands.find(commandName);

  if (!Command) return;

  Command.invoke(message, args);
});

client.login(token);
