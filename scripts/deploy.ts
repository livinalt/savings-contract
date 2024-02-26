import { ethers } from "hardhat";

async function main() {
  
  const simpleSavingsFactory = await ethers.deployContract("SimpleSavingsFactory");

  await simpleSavingsFactory.waitForDeployment();

  console.log(
    `SimpleSavingsFactory has been deployed to ${simpleSavingsFactory.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
