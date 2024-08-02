import { disperseRon } from "./utils/disperseRon.js";
import readWalletAddressesCSV from "./utils/readcsv.js";

const csvFilePath = "wallets.csv";
const amount = process.env.DISPERSE_AMOUNT || 0;

async function main() {
  try {
    const addresses = await readWalletAddressesCSV(csvFilePath);
    await disperseRon(addresses, amount);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
