import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    buildProfile: "default",
    compilers: [
      { version: "0.8.28", settings: { optimizer: { enabled: true, runs: 200 } } },
    ],
  },
  networks: {
    hardhat: { type: "edr-simulated", chainId: 31337 },
    sepolia: {
      type: "http",
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : undefined,
      chainId: 11155111,
    },
  },
  etherscan: ETHERSCAN_API_KEY
    ? { apiKey: { sepolia: ETHERSCAN_API_KEY } }
    : undefined,
};

export default config;
