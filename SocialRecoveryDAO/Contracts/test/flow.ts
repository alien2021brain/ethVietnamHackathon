import { BaseProvider } from "@ethersproject/providers";
import { expect } from "chai";
import { deployments, ethers, network } from "hardhat";
import { SignerWithAddress } from "hardhat-deploy-ethers/signers";
import { contracts, SocialRecoveryDAO } from "../typechain-types";


describe("DAO Unit test", async () => {
    let SRDAO: SocialRecoveryDAO;
    let accounts: SignerWithAddress[];
    let provider: BaseProvider;
    beforeEach(async () => {
        await deployments.fixture(["all"]);
        SRDAO = await ethers.getContract("SocialRecoveryDAO");
        accounts = await ethers.getSigners();
        provider = await ethers.provider;
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

    });

    it("transfer correctly", async () => {
        const pre_balance_0 = await provider.getBalance(accounts[3].address);
        const pre_balance_1 = await provider.getBalance(accounts[4].address);
        console.log(`Pre balance sender = ${pre_balance_0}`);
        console.log(`Pre balance receiver = ${pre_balance_1}`);
        const sender = accounts[3].address;
        const receiver = accounts[4].address;
        const tx = await SRDAO.connect(accounts[3]).SimplTransfer(receiver, { value: ethers.utils.parseEther("1") });
        await tx.wait();
        const post_balance_1 = await provider.getBalance(receiver);
        const post_balance_0 = await provider.getBalance(sender);
        console.log(`Post balance sender = ${post_balance_0}`);
        console.log(`Post balance receiver = ${post_balance_1}`);
        expect(post_balance_1.gt(post_balance_0)).to.equal(true);
    });

    it("verify correctly", async () => {
        const signer = accounts[0];
        const to = accounts[1].address;
        const message = "Request signing from User A";
        const nonce = 12;

        const hash = await SRDAO.getMessageHash(to, message, nonce);
        const sig = await signer.signMessage(ethers.utils.arrayify(hash));

        expect(await SRDAO.verify(signer.address, to, message, nonce, sig)).to.equal(true);
    });

    it("verify and transfer correctly", async () => {

    })
})