// scripts/deploy.js
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Update with your Ethereum node URL

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.connect(deployer).deploy();

  console.log("Contract address:", todoList.address);
  console.log("Contract transaction hash:", todoList.deployTransaction.hash);

  await todoList.deployed();

  console.log("Contract deployed to:", todoList.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
