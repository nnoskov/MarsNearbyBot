import { Context } from "telegraf";
import { Address } from "ton-core";

export interface SessionData {
  userWallet: Address;
}

export interface IBotContext extends Context {
  session: SessionData;
}
