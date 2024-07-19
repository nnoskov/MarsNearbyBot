import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { BotCommand } from "telegraf/typings/core/types/typegram";

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>) {}
  abstract handle(): void;
}

export const menuCommands: BotCommand[] = [
  {
    command: "/start",
    description: "Running and Restart the Bot",
  },
  {
    command: "/info",
    description: "About the Bot",
  },
];
