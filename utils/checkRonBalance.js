import { ethers } from "ethers";
import chalk from "chalk";
import { provider } from "../config/config.js";
const PAUSE_INTERVAL = 30000; // 30 secs
const log = console.log;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkRonBalance(addresses) {
  let totalBalance = ethers.BigNumber.from(0);

  try {
    for (let i = 0; i < addresses.length; i++) {
      const address = new ethers.Wallet(addresses[i].secret, provider);
      const balance = await provider.getBalance(address.address);

      log(
        chalk.blueBright(`WALLET: ${address.address}`) +
          " has " +
          chalk.redBright(`${ethers.utils.formatEther(balance)} RON`)
      );
      totalBalance = totalBalance.add(balance);

      if ((i + 1) % 100 === 0) {
        log(`${i + 1} wallets checked.`);
        log("Waiting rpc limit keep calm...");
        await sleep(PAUSE_INTERVAL);
      }
    }

    log(
      "Total of " +
        chalk.redBright(`${ethers.utils.formatEther(totalBalance)} RON`) +
        " across all wallets."
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
