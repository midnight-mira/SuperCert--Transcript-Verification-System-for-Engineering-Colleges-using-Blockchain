const hre = require("hardhat");

async function main() {
  try {
    // Get the ContractFactory of your SimpleContract
    const SimpleContract = await hre.ethers.getContractFactory("IPFSHashStorage");

    // Connect to the deployed contract
    const contractAddress = "<DEPLOYED_CONTRACT_ADDRESS>"; // Replace with your deployed contract address
    const contract = await SimpleContract.attach(contractAddress);

    // Set a new message in the contract
    const newMessage = "Hello, Hardhat!";
    await contract.setMessage(newMessage);

    // Retrieve the updated message
    const updatedMessage = await contract.getMessage();
    console.log("Updated Message:", updatedMessage);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();