require("@nomicfoundation/hardhat-toolbox");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const API_KEY = `O-nyOaOy9iGHWpvR9DzVgnu30ayOV9Jr`;

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = "a3af68d31c76774f7976a8660c29f226d0c2b38a2245eabe9ab1ceb84ad5e3f4";

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/O-nyOaOy9iGHWpvR9DzVgnu30ayOV9Jr`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};