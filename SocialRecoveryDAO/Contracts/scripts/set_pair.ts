import { ethers, network } from "hardhat";


export async function set_pair() {
    console.log("hi")
    const SRDAO = await ethers.getContract("SocialRecoveryDAO");

}

set_pair()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })