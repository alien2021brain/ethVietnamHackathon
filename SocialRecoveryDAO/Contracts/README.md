# ethVietnamHackathon
Project for ethVietnam Hackathon

# Function
1. `function set_pair(bytes32 user_hash, address[] calldata rp_addr) external returns(bool)`    
Record the pair of user and SP addresses.
`user_hash`: hash of wallet address and password, bytes32 type.    
`rp_addr`: an array of address of recovery provider    
2. `function get_pair(bytes32 user_hash) external view returns(address[] memory)`     
Get the SP addresses based on user hash.    
`user_hash`: hash of wallet address and password, bytes32 type.    
3. `function registerMember() external`    
Register as a DAO member    
4. `function getDAOmember() external view returns(address [] memory)`    
Get the list of DAO member    

# Address
## Goerli
SocialRecoveryDAO (v1): `0xa7A6FAf6E6Ba8292E2Fe312374b8abf129a3104e`

