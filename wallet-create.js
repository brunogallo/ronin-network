import fs from "fs";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import chalk from "chalk";
const log = console.log;

dotenv.config();
const amountWallets = parseInt(process.env.WALLETS, 10) || 0;
const baseFileName = "wallets";
const fileExtension = ".csv";

async function getUniqueFileName(baseName, extension) {
  let index = 1;
  let fileName = `${baseName}${extension}`;
  while (fs.existsSync(fileName)) {
    fileName = `${baseName}-${index}${extension}`;
    index++;
  }
  return fileName;
}

async function main() {
  try {
    let wallets = [];
    for (let i = 0; i < amountWallets; i++) {
      const wallet = ethers.Wallet.createRandom();

      wallets.push({
        wallet: wallet.address,
        privateKey: wallet.privateKey,
      });
    }

    const csvContent = wallets
      .map((wallet) => `${wallet.wallet},${wallet.privateKey}`)
      .join("\n");

    const outputFile = await getUniqueFileName(baseFileName, fileExtension);

    fs.writeFileSync(outputFile, csvContent);

    log(
      chalk.greenBright(
        `Successfully created ${amountWallets} wallets and saved private keys to ${outputFile}`
      )
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
