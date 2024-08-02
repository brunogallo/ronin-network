import { ethers } from "ethers";
import chalk from "chalk";
import { provider } from "../config/config.js";
const log = console.log;

async function getBalance(address) {
  try {
    const balance = await provider.getBalance(address);
    return balance;
  } catch (error) {
    console.error(`Failed to get balance for ${address}:`, error);
    return ethers.BigNumber.from(0);
  }
}

async function estimateGasCost(toAddress, value) {
  try {
    const gasPrice = await provider.getGasPrice();
    const estimatedGas = await provider.estimateGas({
      to: toAddress,
      value: value,
    });
    return gasPrice.mul(estimatedGas);
  } catch (error) {
    console.error("Failed to estimate gas cost:", error);
    return ethers.BigNumber.from(0);
  }
}

export async function refundRon(walletAddresses) {
  const refundWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const destinationAddress = refundWallet.address;

  for (let i = 0; i < walletAddresses.length; i++) {
    const wallet = new ethers.Wallet(walletAddresses[i].secret, provider);
    const walletAddress = wallet.address;
    const balance = await getBalance(walletAddress);
    const gasCost = await estimateGasCost(destinationAddress, balance);

    if (balance.gt(gasCost)) {
      const amountToSend = balance.sub(gasCost);
      try {
        const tx = await wallet.sendTransaction({
          to: destinationAddress,
          value: amountToSend,
          gasPrice: await provider.getGasPrice(),
        });

        log(
          chalk.greenBright(
            `Sent: ${ethers.utils.formatEther(
              amountToSend
            )} RON to: ${destinationAddress}`
          )
        );
        log(chalk.blueBright(`TX HASH: ${tx.hash}`));
      } catch (error) {
        console.error(
          `Failed to send transaction from ${walletAddress}:`,
          error
        );
      }
    } else {
      log(
        chalk.redBright(
          `Insufficient funds for gas in wallet: ${walletAddress}`
        )
      );
    }
  }
}
