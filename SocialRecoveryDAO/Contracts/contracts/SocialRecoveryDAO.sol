//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SocialRecoveryDAO is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(){
    } 
    
    uint256 DAOID;
    uint256 baseFee = 0.001 ether;
    mapping(bytes32=>address[]) user_to_SP;
    mapping(uint256=>address) DAOID_to_address;
    event New_Pair(bytes32 user, address[] SP_address);

    address private _owner;

    // Social Recovery Related function

    // set the mapping of hash(user)->address[SP]
    function set_pair(bytes32 user_hash, address[] calldata rp_addr) external returns(bool)
    {
        require(user_hash!=0,"user cannot be 0!");

        user_to_SP[user_hash] = rp_addr;
        emit New_Pair(user_hash,rp_addr);
        return true;
    }

    // return the addresses of SP based of user hash
    function get_pair(bytes32 user_hash) external view returns(address[] memory){
        address[] memory rp_addr = user_to_SP[user_hash];
        return rp_addr;
    }


      function registerMember() external{
        DAOID_to_address[DAOID] = msg.sender;
        DAOID = DAOID+1;
      }

    function getDAOmember() external view returns(address [] memory){
        address[] memory DAOmember; // define an empty array

        for (uint256 i=0;i<DAOID;i++){
        DAOmember[i]= DAOID_to_address[i];
        }

        return DAOmember;

    }


    // // NFT-related function

    //     function _baseURI() internal pure override returns (string memory) {
    //     return "";
    // }

    // function safeMint(address to, string memory uri) public onlyOwner {
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    //     _setTokenURI(tokenId, uri);
    // }

    // // The following functions are overrides required by Solidity.

    // function _burn(uint256 tokenId) external override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override(ERC721, ERC721URIStorage)
    //     returns (string memory)
    // {
    //     return super.tokenURI(tokenId);
    // }



}