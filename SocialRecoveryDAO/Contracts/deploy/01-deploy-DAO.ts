import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import "@typechain/hardhat"
import * as dotenv from 'dotenv'
dotenv.config();
import verify from "../utils/helper-function";
import { developmentChains } from "../utils/helper-hardhat-config";
const deployDAO: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const SRDAOContract = await deploy("SocialRecoveryDAO", {
        from: deployer,
        args: []
    });

    console.log(`deployed to: ${SRDAOContract.address}`);

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(SRDAOContract.address, [])
    }
}

export default deployDAO;
deployDAO.tags = ["all"]