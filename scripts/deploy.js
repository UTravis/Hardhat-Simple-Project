// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  console.log('Deploying contract ...')
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();
  console.log(`Contract deployed at address: ${simpleStorage.address}`);

  // Making sure that the contract is not deployed to Hardhar network before it verifies on Etherscan.io
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
    console.log('Waiting for block confirmations to verify contract on EtherScan')
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // Intereacting with contract
  let favoriteNumber = await simpleStorage.retrieve();
  console.log(`Favorite Number: ${favoriteNumber}`);

  const simpleStorageTx = await simpleStorage.store(5);
  await simpleStorageTx.wait(1);

  favoriteNumber = await simpleStorage.retrieve();
  console.log(`New favorite number: ${favoriteNumber}`);
  
}

async function verify(contractAddress, args) {
  console.log("Verifying contract on Etherscan .......");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    });
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Already Verified")
    }else{
      console.log(error)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
