import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import * as dotenv from 'dotenv'
dotenv.config();
import "@nomiclabs/hardhat-etherscan"
import "@typechain/hardhat"
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { chainId: 31337 },
    localhost: { chainId: 31337 },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [`${process.env.DEPLOYER_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: '0.8.4',
  },
  namedAccounts: {
    deployer: 0, // set deployer index as 0
    secondAccount: 1, // set secondAccount index as 1
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`
    }
  }

  //path:{ // you can add this path config, if the contracts store in src/,instead of contracts/
  //	sources:'src',
  //},
};
export default config;