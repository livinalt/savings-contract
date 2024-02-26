import { ethers } from "hardhat";

async function main() {
  
  const simpleSavings = await ethers.deployContract("SimpleSavings");

  await simpleSavings.waitForDeployment();

  console.log(
    `SimpleSavings has been deployed to ${simpleSavings.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
