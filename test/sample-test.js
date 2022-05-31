const { inputToConfig } = require("@ethereum-waffle/compiler");
const { mocha, ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let ContractFactory;
  let contract;
  beforeEach(async function () {
    ContractFactory = await ethers.getContractFactory("SimpleStorage");
    contract = await ContractFactory.deploy();
  });
  it("Should Start with favorite number as zero", async function () {
    const currentvalue = await contract.retrieve();
    const expectedvalue = "0";
    assert.equal(currentvalue.toString(), expectedvalue);
  });
  it("Should update the value after calling store", async function () {
    const check = "7";
    const TransactionResponce = await contract.store(check);
    await TransactionResponce.wait(1);

    const favInt = await contract.retrieve();
    assert.equal(favInt.toString(), check);
  });
});
