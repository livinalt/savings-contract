import { ethers } from "hardhat";

async function main() {

    const contractAddress = "0xCA2d8c7dff657231A17dF9746bAa615c9B29Af5e"; //sepolia
    // const contractAddress2 = "0xCe4b9D48850f28096598D326647168fCB43944D2"; //mumbai

    const SimpleSavings = await ethers.getContractAt("SimpleSavings", contractAddress);
    // const simpleSavings = await SimpleSavings.waitForDeployment();

    const depositAmount = await ethers.parseEther("100");
    // await depositAmount.wait();

    const txn = await SimpleSavings.makeDeposit(depositAmount);
    await txn.wait();
    console.log("You have deposited: ",depositAmount);  
    console.log(`You have deposited ${depositAmount}`);  

    const withdrawAmount = await ethers.parseEther("10");

    const withrawFunds = await SimpleSavings.withdraw(withdrawAmount);
    await withrawFunds.wait();
    console.log(`Uou have successfully withdrawn ${withdrawAmount}`);

    // const getDeposit = await SimpleSavings.getAllDeposit();
    // console.log(`Uou have successfully withdrawn ${withdrawAmount}`);



        
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });