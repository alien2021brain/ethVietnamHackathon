import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { SignerWithAddress } from "hardhat-deploy-ethers/signers";
import { SocialRecoveryDAO } from "../typechain-types";

describe("DAO Unit test", async () => {
    let SRDAO: SocialRecoveryDAO;
    let accounts: SignerWithAddress[];
    beforeEach(async () => {
        await deployments.fixture(["all"]);
        SRDAO = await ethers.getContract("SocialRecoveryDAO");
        accounts = await ethers.getSigners();
    });
    it("set pair correctly", async () => {
        const password = "password";
        let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${accounts[0].address}+${password}`));
        console.log(`Hash = ${hash}`);

        // set pair
        let tx = await SRDAO.set_pair(hash, [`${accounts[1].address}`]);
        // expect(result).to.equal(true);
        let rc: any = await tx.wait();
        const event: any = rc.events.find((events: { event: string; }) => events.event === 'New_Pair');
        const [user, sp_address] = event.args;
        console.log(typeof (sp_address))
        console.log(`${user}`)
        console.log(`${sp_address}`)
        expect(user).to.equal(hash);
        expect(sp_address[0]).to.equal(`${accounts[1].address}`)
    });

    it("get pair correctly", async () => {
        const password = "password";
        let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${accounts[0].address}+${password}`));
        let tx = await SRDAO.get_pair(hash);
        // let rc: any = await tx.wait();
        // TODO: fix error
        console.log(`tx=${tx}`);

    })
})