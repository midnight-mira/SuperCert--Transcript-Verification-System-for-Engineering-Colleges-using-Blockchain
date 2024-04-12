// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract payment{

    struct Memo{
        string name;
        string email;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner; //owner is going to receive funds
    constructor(){
        owner = payable(msg.sender);
    }

    function pay(string calldata name,string calldata email) external payable{
        require(msg.value>0,"Please pay more than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name,email,block.timestamp,msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}