import { ethers } from "ethers";
import chalk from "chalk";
import { provider, wallet } from "../config/config.js";
const PAUSE_INTERVAL = 30000; // 30 secs
const log = console.log;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function disperseRon(addresses, amount) {
  amount = ethers.utils.parseEther(amount);
  const gasPrice = await provider.getGasPrice();

  try {
    for (let i = 0; i < addresses.length; i++) {
      const address = new ethers.Wallet(addresses[i].secret, provider);
      const tx = await wallet.sendTransaction({
        to: address.address,
        value: amount,
        gasPrice: gasPrice,
      });

      log(chalk.blueBright(`Transaction sent to: ${address.address}`));
      log(chalk.redBright(`TX HASH: ${tx.hash}`));

      if ((i + 1) % 100 === 0) {
        log(`${i + 1} wallets checked.`);
        log("Waiting rpc limit keep calm...");
        await sleep(PAUSE_INTERVAL);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
