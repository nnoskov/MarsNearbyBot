import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { beginCell, toNano } from "ton-core";
import qs from "qs";
import { readFileSync } from "fs";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      console.log(ctx.session, ctx.message);
      const text = `Hi ${
        ctx.message.from.first_name ?? "User"
      }! Welcome to Mars Nearby TON Smart Contract testing bot!`;
      await ctx.reply(
        text,
        Markup.inlineKeyboard([
          [
            Markup.button.webApp("🧪 Start TWA", "https://marsnearby.fun"),
            Markup.button.callback("🍩 Donate 0.01", "donate"),
          ],
          [Markup.button.callback("About", "about")],
        ])
      );
    });

    // Hears
    this.bot.hears("Increment by 5", (ctx) => {
      const msg_body = beginCell().storeUint(1, 32).storeUint(5, 32).endCell();
      const link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
      }?${qs.stringify({
        text: "Increment counter by 5",
        amount: toNano("0.01").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
      })}`;
      ctx.reply("To increment counter by 5, please sign a transaction:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Sign transaction",
                url: link,
              },
            ],
          ],
        },
      });
    });
    this.bot.hears("Deposit 0.01", (ctx) => {
      const msg_body = beginCell().storeUint(2, 32).endCell();

      const link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
      }?${qs.stringify({
        text: "Deposit 0.01 TON",
        amount: toNano("0.01").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
      })}`;
      ctx.reply("To deposit by 0.01 TON, please sign a transaction:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Sign transaction",
                url: link,
              },
            ],
          ],
        },
      });
    });
    this.bot.hears("Withdrawal 0.02", (ctx) => {
      const msg_body = beginCell()
        .storeUint(3, 32)
        .storeCoins(toNano("0.02"))
        .endCell();

      const link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
      }?${qs.stringify({
        text: "Withdraw 0.02 TON",
        amount: toNano("0.01").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
      })}`;
      ctx.reply("To withdraw 0.02 TON, please sign a transaction:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Sign transaction",
                url: link,
              },
            ],
          ],
        },
      });
    });

    // Actions
    this.bot.action("increment", (ctx) => {
      const msg_body = beginCell().storeUint(1, 32).storeUint(5, 32).endCell();
      const link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
      }?${qs.stringify({
        text: "Increment counter by 5",
        amount: toNano("0.01").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
      })}`;
      ctx.reply("To increment counter by 5, please sign a transaction:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Sign transaction",
                url: link,
              },
            ],
          ],
        },
      });
    });

    this.bot.action("donate", (ctx) => {
      const msg_body = beginCell().storeUint(2, 32).endCell();
      const link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
      }?${qs.stringify({
        text: "Donate by 0.01 TON",
        amount: toNano("0.01").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
      })}`;
      ctx.reply("To donation me 0.01 TON, please sign a transaction:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Sign transaction",
                url: link,
              },
            ],
          ],
        },
      });
    });

    this.bot.action("about", async (ctx) => {
      const txtHeader = "Text Header";
      let txtBody = "";
      try {
        txtBody = readFileSync("./public/data/text/about.htm", "utf8");
      } catch (error) {
        console.log(error);
      }

      await ctx.replyWithHTML(
        `<b>${txtHeader}</b>\n${txtBody}`,
        Markup.inlineKeyboard([
          Markup.button.webApp("Start testing", "https://marsnearby.fun"),
        ])
      );
    });
  }
}
