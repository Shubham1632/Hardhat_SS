const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying ....");
  const contract = await simpleStorageFactory.deploy();
  await contract.deployed();
  // console.log(contract);
  console.log(`Deployed Contract to: ${contract.address}`);
  // console.log(network.config);

  if (network.config.chainId === 4 && process.env.etherscanApiKey) {
    await contract.deployTransaction.wait(6);
    await verify(contract.address, []);
  }
  const currfavint = await contract.retrieve();
  console.log(`Current FavInt : ${currfavint}`);

  const trannsactionResponce = await contract.store(7);
  await trannsactionResponce.wait(1);
  const updatedvalue = await contract.retrieve();
  console.log(`Updated Value is: ${updatedvalue}`);
}

async function verify(contracAddress, args) {
  console.log("Verifying.....");
  try {
    await run("verify:verify", {
      address: contracAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
