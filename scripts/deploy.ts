import dotenv from "dotenv";
dotenv.config();

import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function normalizePrivateKey(raw?: string): `0x${string}` {
  if (!raw) throw new Error("PRIVATE_KEY пуст");
  const trimmed = raw.trim();
  const with0x = trimmed.startsWith("0x") ? trimmed : `0x${trimmed}`;
  if (with0x.length !== 66) throw new Error(`Incorrect private key length: ${with0x.length}`);
  if (!/^0x[0-9a-fA-F]{64}$/.test(with0x)) throw new Error("PRIVATE_KEY contains invalid characters");
  return with0x as `0x${string}`;
}

async function main() {
  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  if (!rpcUrl) throw new Error("SEPOLIA_RPC_URL is missing (check .env)");
  const pk = normalizePrivateKey(process.env.PRIVATE_KEY);
  const account = privateKeyToAccount(pk);

  // ESM-safe dirname
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/Counter.sol/Counter.json"
  );
  if (!fs.existsSync(artifactPath)) {
    throw new Error("Artifact not found. Run: npx hardhat compile");
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const { abi, bytecode } = artifact;

  console.log("Deploying Counter from:", account.address);

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(rpcUrl),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });

  const txHash = await walletClient.deployContract({ abi, bytecode, args: [] });
  console.log("Tx hash:", txHash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  if (!receipt.contractAddress) throw new Error("No contractAddress in receipt");
  console.log("Contract deployed at:", receipt.contractAddress);
}

main().catch((e) => {
  console.error("Deployment error:", e);
  process.exitCode = 1;
});
