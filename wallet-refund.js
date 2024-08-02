import { refundRon } from "./utils/refundRon.js";
import readWalletAddressesCSV from "./utils/readcsv.js";
const csvFilePath = "wallets.csv";

async function main() {
  try {
    const addresses = await readWalletAddressesCSV(csvFilePath);
    await refundRon(addresses);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
