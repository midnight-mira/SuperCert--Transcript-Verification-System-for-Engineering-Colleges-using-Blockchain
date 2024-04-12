// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract payme {

    address payable owner; //owner is going to receive funds
    constructor(){
        owner = payable(msg.sender);
    }

    uint public amountUsd;

    function fund(int amount) public payable {
        amountUsd = uint(amount);
        owner.transfer(msg.value);
        require(getConversion(msg.value) >= amountUsd, "didnt send enough");
    }

    function getPrice() public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (,int256 price ,,,) = priceFeed.latestRoundData();
        return uint(price * 1e10) ;
    }

    function getConversion(uint ethAmount) public view returns (uint256) {
        uint ethPrice = getPrice();
        uint ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
}