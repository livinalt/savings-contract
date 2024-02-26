import { ethers } from "hardhat";

async function main() {

    const contractAddress = "0x671266D5457C3631A4C297E2C51723e703091f1c"; //sepolia
    // const contractAddress2 = "0xCe4b9D48850f28096598D326647168fCB43944D2"; //mumbai

    const SimpleSavingsFactory = await ethers.getContractAt("SimpleSavingsFactory", contractAddress);
    // const simpleSavings = await SimpleSavings.waitForDeployment();

    // const depositAmount = await ethers.parseEther("100");
    // await depositAmount.wait();

    const txn = await SimpleSavingsFactory.createSimpleSavings();
    await txn.wait();
    console.log(`You have deployed SimpleSavingsFactory`);  

    

    // const getDeposit = await SimpleSavings.getAllDeposit();
    // console.log(`Uou have successfully withdrawn ${withdrawAmount}`);



        
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });