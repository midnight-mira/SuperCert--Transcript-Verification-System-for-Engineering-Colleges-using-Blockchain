async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("IPFSHashStorage");
  console.log("Token address:", await token.getAddress());

  const payment = await ethers.deployContract("payme");
  console.log("Token address:", await payment.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //address for ipfsHash =0xcafDfC95e5E55c3a75376EA734799201f9Bb93B2
  //address for payment = 0xB6A199c4Ed5d7Ec5461c229C5A7c80FD40f48743