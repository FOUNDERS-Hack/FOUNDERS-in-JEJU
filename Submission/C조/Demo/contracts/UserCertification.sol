pragma solidity >=0.4.22 <0.8.0;

contract UserCertification {
    
    address admin;
    
    // 사용자 정보
    struct UserInfo {
        string name;
        address[] records;
    }
    
    // 인증기관 정보
    struct InstitutionInfo {
        string name;
        string licenseValue;
    }
    
    // 채용기업 정보
    struct CompanyInfo {
     bool allowReference;
     uint256 approveBlockNo;
     uint256 refLimitBlockNo;
     address company;
    }
    
    mapping(address => CompanyInfo) companyInfo;
    mapping(address => UserInfo) userInfo;
    mapping(address => InstitutionInfo) public institutionInfo;
    
    // 생성자
    constructor() public {
        admin = msg.sender;
    }
    
    // 사용자 정보 등록
    function setUser(string memory _name) public {
        userInfo[msg.sender].name = _name;
    }
    
    // 기관이 자격증 정보 등록
    function setInstitution(string memory _licenseValue) public {
        institutionInfo[msg.sender].licenseValue = _licenseValue;
    }
    
    // 인증기관이 자격증 정보 인증
    function sendCertification(address _user) public {
        userInfo[_user].records.push(msg.sender);
    }
    
    // 사용자가 채용기업에게 정보 열람 허락
    function permitReference(address _company, uint256 _span) public {
        companyInfo[msg.sender].allowReference = true;
        companyInfo[msg.sender].approveBlockNo = block.number;
        companyInfo[msg.sender].refLimitBlockNo = block.number + _span;
        companyInfo[msg.sender].company = _company;
    }

    // 채용기업이 정보 열람
    function getUserInfo(address _user) public view returns (
                                        bool _allowReference,
                                        uint256 _approveBlockNo,
                                        uint256 _refLimitBlockNo,
                                        address _company,
                                        string memory _name,
                                        address[] memory _records) {
        
        _allowReference = companyInfo[_user].allowReference;
        _approveBlockNo = companyInfo[_user].approveBlockNo;
        _refLimitBlockNo = companyInfo[_user].refLimitBlockNo;
        _company = companyInfo[_user].company;       
        
        // 채용기업이 열람 허락 받았으면 사용자 경력, 이력 정보 볼 수 있음
        if (((msg.sender == _company) && (_allowReference == true) && (block.number < _refLimitBlockNo))
            || (msg.sender == admin) || (msg.sender == _user)) {
                _name = userInfo[_user].name;
                _records = userInfo[_user].records;
        }
    }
}