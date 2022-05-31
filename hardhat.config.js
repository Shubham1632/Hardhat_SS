require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const rinkebyRpcUrl = process.env.rinkebyRPCURL;
const privateKey = process.env.PrivateKey;
const apikey = process.env.etherscanApiKey;
const localKey = process.env.localPrivateKey;
const COINMARKET = process.env.coinmarketcapKey;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: rinkebyRpcUrl,
      accounts: [privateKey],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      acoounts: [localKey],
      chianId: 31337,
    },
  },
  etherscan: {
    apiKey: apikey,
  },
  solidity: "0.8.8",
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: COINMARKET,
    token: "MATIC",
  },
};
