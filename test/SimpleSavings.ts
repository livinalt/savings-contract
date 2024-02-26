import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleSavings", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySimpleSavingsFixture() {
   
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleSavings = await ethers.getContractFactory("SimpleSavings");
    const simpleSavings = await SimpleSavings.deploy();

    return { simpleSavings, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // I am destructuring this by looking into the contract and taking the two variable require
      // simpleSavings is the variable holding the COntract instance from the loadfixture
      // owner is one of the signers of the contract

      // basically from this destructuring all I am saying is that I need the two variables 
      // simpleSavings and owner from loadfixture and return them for this particular test 
      const { simpleSavings, owner, otherAccount } = await loadFixture(deploySimpleSavingsFixture);

      // i expect the owner from the simpleSavings to equal the owner address
      expect(await simpleSavings.owner()).to.equal(owner.address);
    });
      // expect(await simpleSavings.owner()).to.equal(otherAccount.address)});

 
  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.target)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  describe("Deposit", function () {
      it("Should check if the amount is less or equal to Zero", async function () {
        const { simpleSavings } = await loadFixture(deploySimpleSavingsFixture);
        
       await expect(simpleSavings.makeDeposit(0)).to.be.revertedWithCustomError(simpleSavings,"INVALID_AMOUNT");
      });

       /* await expect(simpleSavings.makeDeposit(0)).to.be.revertedWith("You can't save zero");
      }); */

      it("Should chek to see if user has enough balance", async function () {
        const { simpleSavings, owner, otherAccount } = await loadFixture(
          deploySimpleSavingsFixture);
          const deposit = await ethers.parseUnits("100000", 18);
          await expect(simpleSavings.makeDeposit(deposit)).to.be.revertedWithCustomError(simpleSavings,"INSUFFICIENT_FUNDS" );
        
      });

      // // i dont know its flagging error
      // it("Should make deposit", async function () {
      //   const { simpleSavings, owner, otherAccount} = await loadFixture(
      //     deploySimpleSavingsFixture);

      //     const depositAmount = await ethers.parseEther("1");
      //     const txn = await simpleSavings.makeDeposit(depositAmount);
      //     await txn.wait();

      //     expect(simpleSavings.makeDeposit(depositAmount)).to.be.equal(txn);
      // });    
      
      describe( "Withdrawals", function(){

        it("Should confirm the account owner and revert error", async function () {
          const {simpleSavings, owner, otherAccount} = await loadFixture(deploySimpleSavingsFixture);

          const txn = await ethers.parseUnits("100000", 18);            
            await expect(simpleSavings.connect(otherAccount).withdraw(txn)).to.be.revertedWithCustomError(simpleSavings,"NOT_ACCOUNT_OWNER");
        });

        it("If withdrawing zero, revert error", async function () {
          
          const {simpleSavings} = await loadFixture(deploySimpleSavingsFixture);
                  
          await expect(simpleSavings.withdraw("0")).to.be.revertedWithCustomError(simpleSavings,"INVALID_AMOUNT");
      });

        it("Should trannsfer to the owner", async function() {
          const {simpleSavings, owner} = await loadFixture(deploySimpleSavingsFixture);
          const deposit = await ethers.parseEther("50");            
          const amount = await ethers.parseEther("10");  
          const balance = await deposit - amount;

          await expect(simpleSavings.withdraw(amount)).to.equal(BigInt:balance);
        })

        it("Should get all depoitr", async function() {
          const {simpleSavings, owner} = await loadFixture(deploySimpleSavingsFixture);
                
          await expect(simpleSavings.getAllDeposit());
        })

      });
    

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });

  });
});
});