import fs from "fs";
import { parse } from "csv-parse";

async function readWalletAddressesCSV(filePath) {
  return new Promise((resolve, reject) => {
    const wallets = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: "," }))
      .on("data", (row) => {
        if (row.secret) {
          wallets.push({
            wallet: row.wallet,
            secret: row.secret,
            email: row.email,
          });
        }
      })
      .on("end", () => resolve(wallets))
      .on("error", (error) => reject(error));
  });
}

export default readWalletAddressesCSV;
