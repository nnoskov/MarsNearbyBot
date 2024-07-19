import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { beginCell, toNano } from "ton-core";
import qs from "qs";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx);
      ctx.reply("Welcome to Mars Nearby bot!", {
        reply_markup: {
          keyboard: [["Increment by 5"], ["Deposit 0.01"], ["Withdrawal 0.02"]],
        },
      });
      //   ctx.reply(
      //     "Welcome to Mars Nearby bot!",
      //     Markup.keyboard([
      //       Markup.button.callback("Increment by 5", "increment"),
      //       Markup.button.callback("Deposit 0.01", "deposit"),
      //       Markup.button.callback("Withdrawal 0.02", "withdrawal"),
      //     ])
      //   );
    });

    // Hears
    this.bot.hears("Increment by 5", (ctx) => {
      const msg_body = beginCell().storeUint(1, 32).storeUint(5, 32).endCell();
      let link = `https://app.tonkeeper.com/transfer/${
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

      let link = `https://app.tonkeeper.com/transfer/${
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

      let link = `https://app.tonkeeper.com/transfer/${
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
      let link = `https://app.tonkeeper.com/transfer/${
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
  }
}
