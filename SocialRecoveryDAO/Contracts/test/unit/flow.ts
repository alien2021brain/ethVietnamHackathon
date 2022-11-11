import { SocialRecoveryDAO } from "../../typechain-types";
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"
import { beforeEach, describe, it } from "node:test";

console.log("2")
describe("Social Recovery DAO flow", async () => {
    let SRDAO: SocialRecoveryDAO
    beforeEach(async () => {
        await deployments.fixture(["all"])
        SRDAO = await ethers.getContract("SocialRecoveryDAO")
    })
    let accounts = await ethers.getSigners();
    let user_wallet_address = accounts[0];
    let sp_1 = accounts[1];
    let sp_2 = accounts[2];
    let sp_3 = accounts[3];
    let password = "random password";
    let fake_password = "r password";
    it("should set pair correctly", async () => {
        let hash_data = ethers.utils.keccak256(user_wallet_address + password);
        let sp = [sp_1.toString(), sp_2.toString(), sp_3.toString()];
        let result = SRDAO.set_pair(hash_data, sp);
        expect(result).to.equal(false);
    })
})