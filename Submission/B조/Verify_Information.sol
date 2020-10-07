pragma solidity >=0.4.19;

contract VerifyInformation {

    string public token;
    string public poli;
    uint8 public decimals;
    uint256 public totalPoli;

    mapping (address => uint256) public balanceOf;

    event Verify(address indexed from, address indexed to, uint256 value);

    constructor (uint256 _supply, string memory _token, string memory _poli, uint8 _decimals){
        balanceOf[msg.sender] = _supply;
        token = _token;
        poli = _poli;
        decimals = _decimals;
        totalPoli = _supply;
    }

    function verify(address _to, uint256 _value) private{
        if (balanceOf[msg.sender] < _value) revert();
        if (balanceOf[_to] + _value < balanceOf[_to]) revert();

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Verify(msg.sender, _to, _value);
    }  
}