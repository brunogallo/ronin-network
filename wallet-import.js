import puppeteer from "puppeteer";
import fs from "fs";
const outputFile = "wallets.csv";

async function initiate(secret, index, lines) {
  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9222",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    "chrome-extension://fnjhmkhhmkbjkkabndcnnogagogbneec/src/pages/newtab/new-tab.html?#/import-key"
  );

  await page.waitForSelector(
    "#app-container > div > div > div > div > div > div:nth-child(1) > form > div > div > div > input"
  );
  await page.type(
    "#app-container > div > div > div > div > div > div:nth-child(1) > form > div > div > div > input",
    "4d9e3534"
  );

  await page.waitForSelector(
    "#app-container > div > div > div > div > div > div:nth-child(1) > form > button"
  );
  await page.click(
    "#app-container > div > div > div > div > div > div:nth-child(1) > form > button"
  );

  await page.waitForSelector("#rc-tabs-1-tab-2");
  await page.click("#rc-tabs-1-tab-2");
  console.log("Open wallet tab");

  await page.waitForSelector(
    "#app-container > div > div > div > div > div:nth-child(1) > div._content_15p1k_1._fullWidth_13ckt_1 > div > div > div > div._input_1lwi2_20 > input"
  );
  await page.type(
    "#app-container > div > div > div > div > div:nth-child(1) > div._content_15p1k_1._fullWidth_13ckt_1 > div > div > div > div._input_1lwi2_20 > input",
    secret
  );

  await page.waitForSelector(
    "#app-container > div > div > div > div > div:nth-child(1) > div._content_15p1k_1._fullWidth_13ckt_1 > div > button.button-module_button__Z331g.button-module_intent-primary__SAO1x.button-module_size-default__caw9O.button-module_matcha-button__t9Ccm.button-module_rounded__2T8oF.button-module_intent-primary__2RQGO._button1_1lwi2_40"
  );
  await page.click(
    "#app-container > div > div > div > div > div:nth-child(1) > div._content_15p1k_1._fullWidth_13ckt_1 > div > button.button-module_button__Z331g.button-module_intent-primary__SAO1x.button-module_size-default__caw9O.button-module_matcha-button__t9Ccm.button-module_rounded__2T8oF.button-module_intent-primary__2RQGO._button1_1lwi2_40"
  );

  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll("button")).some(
      (el) => el.textContent.trim() === "Finish"
    );
  });

  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (el) => el.textContent.trim() === "Finish"
    );
    if (button) {
      button.click();
    }
  });
}

(async () => {
  const lines = fs
    .readFileSync(outputFile, "utf-8")
    .split("\n")
    .filter((line) => line.trim() !== "");

  for (let i = 0; i < lines.length; i++) {
    const [wallet, secret] = lines[i].split(",");
    try {
      await initiate(secret, i, lines);
    } catch (error) {
      console.error("Unhandled error in initiate function:", error);
    }
  }
})();
