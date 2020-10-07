pragma solidity >=0.4.24;

contract MakeInformation{
    
    uint256 keyIndex;

    struct Datum {
        string info;
        uint politId;
    }

    mapping (uint256 => Datum) Data;
    
    function createData(string memory _info, uint _politId) public returns (uint256) {
        Data[keyIndex].info = _info;
        Data[keyIndex].politId = _politId;
        keyIndex++;
        return keyIndex;
    }

    function getInfo(uint _key) public view returns (string memory){
        return Data[_key].info;
    }

    function getPolitId(uint _key) public view returns (uint){
        return Data[_key].politId;
    }
}