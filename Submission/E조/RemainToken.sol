pragma solidity ^0.6.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";


contract RemainToken is ERC721 {
    using SafeMath for uint256;

    string private _baseURI = "http://localhost:3000/";
    
    mapping (uint256 => string) public _tokenURIs;

    //Each token belongs to who
    mapping (uint256 => address) public idToOwner;

    //All tokens
    uint256[] internal allTokens;
    
    //Each address has how many tokens
    mapping (address => uint256[]) public ownedTokens;

    //how many ERC721 tokens that we actually own
    mapping(address=>uint256) internal ownedTokensCount;

    //each course number of tokens
    mapping(uint256 => uint256) internal coursesTokens;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    event Course(
        string  _name,
        string  _description,
        uint256 indexed _id
    );

    event Locations(
        string  _course,
        string  _locname,
        string  _description,
        uint256 indexed _locid,
        uint256 indexed _courseId
    );

    mapping(address => mapping(uint256=>uint256[])) public userLocationVerified;

    address public owner;

    uint256[] public courses;

    mapping(uint256=>uint256[]) public courseToLocations;

    constructor() ERC721("RemainToken","REMAINTOKEN") public {
        owner = msg.sender;
    }
    


    function append(string memory a, string memory b) internal pure returns (string memory) {

    return string(abi.encodePacked(a, b));

    }

    function registerCourse( string memory course, string memory description) external {
        uint256 courseHash = uint256(keccak256(abi.encode(course)));
        courses.push(courseHash);
        emit Course(course,description,courseHash);
    }

    function registerLocations(string memory  _course, string memory _location, string memory description) external {
        uint256 courseHash = uint256(keccak256(abi.encode(_course)));
        uint256 locNumber = uint256(keccak256(abi.encode(_location)));
        courseToLocations[courseHash].push(locNumber);
        emit Locations(_course, _location,description,locNumber,courseHash);
    }

    function verifyUserLocation(address  _user, string memory _location, string memory _course) external {
        uint256 locNumber = uint256(keccak256(abi.encode(_location)));
        uint256 courseHash = uint256(keccak256(abi.encode(_course)));
        userLocationVerified[_user][courseHash].push(locNumber); 
    }

    function getUserLocationVerified(address _user, string memory _location, string memory _course) external view returns(bool) {
        uint256 locNumber = uint256(keccak256(abi.encode(_location)));
        uint256 courseHash = uint256(keccak256(abi.encode(_course)));
        uint256 length = userLocationVerified[_user][courseHash].length;

        for(uint i=0; i < length; i++ ) {
            uint256 elementHash = uint256(keccak256(abi.encode(userLocationVerified[_user][courseHash][i])));
            if (locNumber == elementHash) {
                return true;
            }
        }

        return false;
    
    }

    function verifyUserCouseToMintToken(address _user, string memory _location, string memory _course) external returns(bool){
        uint256 courseHash = uint256(keccak256(abi.encode(_course)));
    
        uint256 length = userLocationVerified[_user][courseHash].length;
        uint256 savedLength = courseToLocations[courseHash].length;      
        
        if(length != savedLength) {
            return false;
        }

        string memory uname = append(_course,".jpg");

        mint(_course,_user,uname);
        return true;
        }

    

    function mint(string memory _course, address _user , string memory uri) public  {

        uint256 _id;
        
        uint256 courseHash = uint256(keccak256(abi.encode(_course)));
        uint256 userHash = uint256(keccak256(abi.encode(_user)));
               
         _id = courseHash + userHash;

        _mint(_user,_id);
        _tokenURIs[_id] = uri;
        
        coursesTokens[courseHash] += 1;
        }

    function _mint( address _to,uint256 _tokenId) internal virtual override{

        _addRemainToken(_to, _tokenId);

        emit Transfer(address(0), _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override  {
        address tokenOwner = idToOwner[_tokenId];
        require(tokenOwner==_from);
        require(_to != address(0));
        _transfer(_to, _tokenId);
    }

    function _transfer(address _to, uint256 _tokenId) internal {
        address from = idToOwner[_tokenId];
        _removeRemainToken(from, _tokenId);
        _addRemainToken(_to, _tokenId);
        emit Transfer(from, _to, _tokenId);

    }

    function _removeRemainToken(address _from,uint256 _tokenId) internal {
        require(idToOwner[_tokenId] == _from);
        
        ownedTokensCount[_from] = ownedTokensCount[_from] -1;
        delete idToOwner[_tokenId];  
    }

    function _addRemainToken(address _to, uint256 _tokenId) internal {
        idToOwner[_tokenId] = _to;
        ownedTokens[_to].push(_tokenId);
        ownedTokensCount[_to] = ownedTokensCount[_to].add(1);
    }

    function _getOwnedTokensCount(address _owner) public  returns(uint256) {
        return ownedTokensCount[_owner];
    }
    
    function returnLocationValue(uint256 id) public returns(uint256[] memory ) {
        return courseToLocations[id];
    }
    
    function getOwnersToken(address _address, uint256 __index) public returns(uint256) {
        return ownedTokens[_address][__index];
    }
    
    

}