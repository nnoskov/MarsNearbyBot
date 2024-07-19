import { config, DotenvParseOutput } from "dotenv";
import { IConfigSevice } from "./config.interface";

export class ConfigService implements IConfigSevice {
  private config: DotenvParseOutput;
  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error("File .env is not reachable");
    }
    if (!parsed) {
      throw new Error("File .env is empty");
    }
    this.config = parsed;
  }
  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error("Key didn't find");
    }
    return res;
  }
}
