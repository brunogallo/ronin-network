import fs from "fs";
import * as dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractABI = JSON.parse(fs.readFileSync("abi-ron.json", "utf-8"));
const contractAddress = process.env.CONTRACT_ADDRESS || "";

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

export { provider, wallet, contract };
