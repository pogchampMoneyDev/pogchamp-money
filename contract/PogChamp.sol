// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.4;

import "./IBEP20.sol";

contract PogChamp is Context, IBEP20, Ownable {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    mapping (address => bool) private _taxExcluded;

    mapping (address => uint256) private _lock;

    uint256 private _totalSupply     = 813916297;

    uint256 private constant _burnRate = 5;
    uint256 private constant _pogRate = 3;
    uint256 private constant _pogTimeout = 60 * 60 * 8;

    bool private _pogPostingEnabled = false;

    address private constant _deadAddress = address(0x0dEaD);

    uint8 private _decimals = 0;
    string private _symbol = "POG";
    string private _name = "PogChamp";

    function postPogs() external {
        require(_lock[_msgSender()] < block.timestamp, "POG: Cannot post POGs while locked.");
        require(_pogPostingEnabled, "POG: PogPosting has not been enabled yet.");

        uint256 share = _balances[_msgSender()].mul(_balances[address(this)]).div(_totalSupply);

        _balances[_msgSender()] = _balances[_msgSender()].add(share);
        _balances[address(this)] = _balances[address(this)].sub(share);


        emit Transfer(address(this), _msgSender(), share);
        _lock[_msgSender()] = block.timestamp.add(_pogTimeout);
    }

    constructor () {
        _taxExcluded[_deadAddress] = true;
        _taxExcluded[_msgSender()] = true;

        _balances[_msgSender()] = _totalSupply;

        emit Transfer(address(0), _msgSender(), _balances[_msgSender()]);
    }

    function getOwner() external override view returns (address) {
        return owner();
    }

    function decimals() external override view returns (uint8) {
        return _decimals;
    }

    function symbol() external override view returns (string memory) {
        return _symbol;
    }

    function name() external override view returns (string memory) {
        return _name;
    }

    function totalSupply() external override view returns (uint256) {
        return _totalSupply;
    }

    function circulatingSupply() external view returns (uint256) {
        return _totalSupply - _balances[_deadAddress] - _balances[address(this)];
    }

    function burnedSupply() external view returns (uint256) {
        return _balances[_deadAddress];
    }

    function redistributionPool() external view returns (uint256) {
        return _balances[address(this)];
    }

    function getPogPoolShare() external view returns (uint256) {
        if(_lock[_msgSender()] > block.timestamp) {
            return 0; 
        }

        return _balances[_msgSender()].mul(_balances[address(this)]).div(_totalSupply);
    }

    function balanceOf(address account) external override view returns (uint256) {
        return _balances[account];
    }

    function getTimelock(address account) external view returns (uint256) {
        return _lock[account];
    }

    function isTaxExcluded(address addr) external view returns (bool) {
        return _taxExcluded[addr];
    }

    function pogPostingEnabled() external view returns (bool) {
        return _pogPostingEnabled;
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        require(_lock[_msgSender()] < block.timestamp, "POG: Cannot transfer POGs while locked.");

        if (_taxExcluded[_msgSender()]) {
            _transfer(_msgSender(), recipient, amount);
        } else {
            _transferTaxed(_msgSender(), recipient, amount);
        }
        
        return true;
    }

    function allowance(address owner, address spender) external override view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        
        if (_taxExcluded[sender]) {
            _transfer(sender, recipient, amount);
        } else {
            _transferTaxed(sender, recipient, amount);
        }

        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "BEP20: decreased allowance below zero"));
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "BEP20: transfer from the zero address");
        require(recipient != address(0), "BEP20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);

        emit Transfer(sender, recipient, amount);
    }

    function _transferTaxed(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "BEP20: transfer from the zero address");
        require(recipient != address(0), "BEP20: transfer to the zero address");

        uint256 tax = amount.mul(_burnRate).div(100);
        uint256 pog = amount.mul(_pogRate).div(100);

        _balances[sender]           = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
        _balances[recipient]        = _balances[recipient].add(amount.sub(tax));
        _balances[_deadAddress]     = _balances[_deadAddress].add(tax).sub(pog);
        _balances[address(this)]    = _balances[address(this)].add(pog);

        emit Transfer(sender, recipient, amount.sub(tax));
        emit Transfer(sender, _deadAddress, tax.sub(pog));
        emit Transfer(sender, address(this), pog);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "BEP20: approve from the zero address");
        require(spender != address(0), "BEP20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function taxExclude(address addr) external onlyOwner {
        _taxExcluded[addr] = true;
    }

    function taxInclude(address addr) external onlyOwner {
        _taxExcluded[addr] = false;
    }

    function pogPostingEnable() external onlyOwner {
        _pogPostingEnabled = true;
    }

}