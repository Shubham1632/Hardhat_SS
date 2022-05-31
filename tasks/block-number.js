const { task } = require("hardhat/config");

task("block-number", "prints the current clock number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`The current block numebe is ${blockNumber}`);
  }
);

module.exports = {};
