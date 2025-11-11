Instructions
Task: Install Hardhat 

Please prepare the development tool according to the instructions below. 

As proof of task completion, please submit the link to the contract deployment transaction on the Blockchain explorer site. 



Steps 0. Install Node.js. 

Create a folder for your test application. 
Initialize test application folder with: 
npm init 

Add hardhat dependency: 
npm install --save-dev hardhat 

Initialise test application folder with: 
npx hardhat init 

Choose JavaScript or TypeScript project. 

Review project structure, get familiar with contracts and tests location. Find out how to compile and test contracts. 
Add your target Blockchain Testnet configuration including your Metamask account to hardhat.config.(js|ts). 
Deploy sample Lock contract to your target Blockchain Testnet. 


---

## 🧾 **Final Report — Task: Install Hardhat and Deploy Contract**

I successfully installed and configured **Hardhat v3.0.4** using **TypeScript** and **ethers.js v6.14**.
The project was initialized with the Hardhat template and configured to use the **Sepolia Test Network** via **Infura RPC** and a MetaMask account (private key stored in `.env`).

A sample smart contract `Counter.sol` was compiled using **Solidity v0.8.28** and deployed to the Sepolia testnet with the command:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

**Deployed contract address:**
[`0xf57010089b380e5c90819eba437a0b9a27a6ae61`](https://sepolia.etherscan.io/address/0xf57010089b380e5c90819eba437a0b9a27a6ae61)

The deployment was successful and verified on **Sepolia Etherscan**.
This confirms that Hardhat and the deployment pipeline are correctly configured.

