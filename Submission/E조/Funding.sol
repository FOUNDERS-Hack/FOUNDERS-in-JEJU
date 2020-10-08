pragma solidity ^0.6.0;

contract Funding {

    address owner;

    constructor() public {
        owner == msg.sender;
    }

    modifier onlyOwner(address _address) {
        require(_address == msg.sender);
        _;
    }

    string[] public projects;
    
    mapping(address => bool) public institutionsRegistered;

    mapping(string => address) public projectsToInstitution;

    mapping(address => uint256) public institutionBalance;

    mapping(string => bool) public permitteddProjects;

    mapping(string => bytes) public verificationsToProjects;

    mapping(string => mapping(address=>uint256)) public donationAndValueListForProject;
    
    function registerInstitution(address _institution) public {
        require(_institution == msg.sender);
        require(institutionsRegistered[_institution] == false);
        institutionBalance[msg.sender] = 0;   
        institutionsRegistered[_institution] = true;
    }

    function registerProjects(string memory _projectName, address _institution) public {
        require(_institution == msg.sender);
        require(institutionsRegistered[_institution] == true);
        projects.push(_projectName);
        projectsToInstitution[_projectName] = _institution;
    }

    function getDonate(string memory _project, address _institution) public payable {
        require(projectsToInstitution[_project] == _institution);
        donationAndValueListForProject[_project][msg.sender] += msg.value;
        institutionBalance[_institution] += msg.value;
    }

    //verification will be posted to blockchain
    function postVerification(string memory _project, address _institution, bytes memory _verification) public returns(bool) {
        require(projectsToInstitution[_project] == _institution);
        verificationsToProjects[_project] = _verification;
        return true;
    }
    //upper 20% will approve the verfication - in the application layer
    //after approving process is finished, below funtion will be called
    function permited(string memory _project, address _institution ) public  onlyOwner(msg.sender){
        require(projectsToInstitution[_project] == _institution);

        permitteddProjects[_project] = true;
    }


    function trnasferEachFund(string memory _project, address payable _institution) public onlyOwner(msg.sender) {
        require(projectsToInstitution[_project] == _institution);
        require(permitteddProjects[_project]==true);

        _institution.transfer(institutionBalance[_institution]);
    }

    

}