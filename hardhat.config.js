require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number")

const GOERLI_RPC_URL = process.env.GOERLI_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "hardhat",   // Default network for hardhat
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5  // ChainID for Goerli testnet
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  },
  solidity: "0.8.17",
};
