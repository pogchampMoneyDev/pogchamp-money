// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.4;

import "./IBEP20.sol";

contract CrowdSale is Context, Ownable {
    using SafeMath for uint256;

    IBEP20 private TOKEN;
    event Received(address, uint);
    
    uint256 private _weiPerToken;

    bool private _presaleOpen = false;
    bool private _presaleDone = false;
    bool private _presaleCancelled = false;

    // SoftCap at 20 BNB ~25K USD. HardCap is given by Token supply given to the CrowdSale Contract, multiplied by the price.
    uint256 private _softCap = 50 * (10 ** 18);
    uint256 private _hardCap = 200 * (10 ** 18);

    mapping (address => uint256) private _contributions;

    uint256 PRESALE_TIMELOCK;

    modifier presaleExpired {
        require(!_presaleDone, "CrowdSale: Presale has been closed already!");
        require(_presaleOpen, "CrowdSale: Crowd Sale has not opened yet!");
        require(block.timestamp >= PRESALE_TIMELOCK, "CrowdSale: Too early to close the CrowdSale!");
        _;
    }

    constructor () {
        TOKEN = IBEP20(address(0x6A4F3FcdE68Dd90eE3B1A8d9d5928DBFaA0b458f));
    }


    receive () external payable {
        require(!_presaleDone, "CrowdSale: Presale has been closed already!");
        require(_presaleOpen, "CrowdSale: Crowd Sale has not opened yet!");
        
        payout(uint256(msg.value));
        
        _contributions[_msgSender()] = _contributions[_msgSender()].add(msg.value);

        emit Received(_msgSender(), msg.value);
    }
    
    function payout(uint256 value) private {
        uint256 payoutAmount = value.div(_weiPerToken);

        require(payoutAmount <= TOKEN.balanceOf(address(this)), "CrowdSale: CrowdSale is sold out!");

        TOKEN.transfer(_msgSender(),  payoutAmount); 
    }

    function openPresale(uint256 duration) public onlyOwner {
        require(!_presaleOpen, "CrowdSale: Crowd Sale is already opened!");
        require(!_presaleDone, "CrowdSale: Crowd Sale has already been done!");

        PRESALE_TIMELOCK = block.timestamp.add(duration);
        _weiPerToken = _hardCap.div(TOKEN.balanceOf(address(this)));

        _presaleOpen = true;
    }

    function closePresale() public onlyOwner presaleExpired {
        require(address(this).balance > _softCap, "CrowdSale: SoftCap not met!");

        _presaleOpen = false;
        _presaleDone = true;

        _msgSender().transfer(address(this).balance);
        TOKEN.transfer(_msgSender(), TOKEN.balanceOf(address(this))); 
    }

    function claimFailure() public presaleExpired {
        require( address(this).balance < _softCap, "CrowdSale: Presale has met the soft cap, and cannot be cancelled!");

        _presaleOpen = false;
        _presaleDone = true;
        _presaleCancelled = true;
    }

    function reclaim() public {
        require(_presaleCancelled, "CrowdSale: Contributions can only be reclaimed if the crowdsale has been cancelled!");

        _msgSender().transfer(_contributions[_msgSender()]);
    }

    function getWeiPerToken() public view returns (uint256) {
        return _weiPerToken;
    }
    
    function getCrowdsaleEnd() public view returns (uint256) {
        return PRESALE_TIMELOCK;
    }
    
    function estimatePayout(uint256 value) public view returns (uint256) {
        return value.div(_weiPerToken);
    }

    function softCap() public view returns (uint256) {
        return _softCap;
    }

    function hardCap() public view returns (uint256) {
        return _hardCap;
    }

    function presaleOpen() public view returns (bool) {
        return _presaleOpen;
    }

    function presaleDone() public view returns (bool) {
        return _presaleDone;
    }

    function presaleFailed() public view returns (bool) {
        return (block.timestamp <= PRESALE_TIMELOCK) && (address(this).balance < _softCap);
    }

    function presaleSuccess() public view returns (bool) {
        return (block.timestamp <= PRESALE_TIMELOCK) && (address(this).balance >= _softCap);
    }

    function presaleCancelled() public view returns (bool) {
        return _presaleCancelled;
    }

    function getTimelock() public view returns (uint256) {
        return PRESALE_TIMELOCK;
    }
}