// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSHashStorage {
    mapping(string => bool) public ipfsHashes;

    event HashStored(string indexed hash);

    function storeHash(string memory _cid) external {
        string memory hash = _cid;
        ipfsHashes[hash] = true;
        emit HashStored(hash);
    }

    function hashExists(string memory _hash) external view returns (bool) {
        return ipfsHashes[_hash];
    }
}

