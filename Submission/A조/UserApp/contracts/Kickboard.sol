// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Kickboard {
    
    struct LenderInfo {    
        uint starttime;
        uint brakesensor;  //normal range >=3
        uint brakewire;  //abnormal 0 
        uint speedwire;  //abnormal 0 
    }
    
    struct ReturnInfo {   
        uint endtime;
        uint brakesensor; 
        uint brakewire; 
        uint speedwire;  
    }
    
    struct DefectInfo{    
        uint time;
        uint brakesensor;
        uint brakewire; 
        uint speedwire;
    }
    
    struct CheckInfo{    
        uint checktime;
        uint brakesensor;
        uint brakewire; 
        uint speedwire; 
    }
    
    struct KickInfo{    
        string id;
        string[] ids;
        string managerid;
        string[] managerids;
        uint16 devicenum;
        uint16[] devicenums;
        
        mapping(string => LenderInfo) lenderinfo;
        mapping(string => ReturnInfo) returninfo;
        mapping(string => DefectInfo) defectinfo;
        mapping(string => CheckInfo) checkinfo;    
    }
    
    mapping(uint16 => KickInfo) KickInfos;
    
    address public signer;
    
    constructor() public {
        signer = msg.sender;
    }
   
    event lendkickboard (address signer, uint16 _devicenum, string _id, uint _brakesensor, uint _brakewire, uint _speedwire);
    
    function LendKickboard(uint16 _devicenum, string memory _id, uint _brakesensor, uint _brakewire, uint _speedwire) public {
        
        KickInfos[_devicenum].id = _id;
        KickInfos[_devicenum].lenderinfo[_id].starttime = block.timestamp;
        KickInfos[_devicenum].lenderinfo[_id].brakesensor = _brakesensor;
        KickInfos[_devicenum].lenderinfo[_id].brakewire = _brakewire;
        KickInfos[_devicenum].lenderinfo[_id].speedwire = _speedwire;
        KickInfos[_devicenum].devicenums.push(_devicenum);
    
        
        require ((_brakesensor >=3)&&(_brakewire > 0)&&(_speedwire > 0));
        
        emit lendkickboard (signer, _devicenum, _id, _brakesensor, _brakewire, _speedwire);
    }
    
    event reviewdefects (address signer, uint16 devicenum, string defectuserid, bool brakeproblem, bool wheelproblem);
    
    function ReturnKickboard(uint16 _devicenum, string memory _id, uint _brakesensor, uint _brakewire, uint _speedwire, bool _brakeproblem, bool _wheelproblem) public{
        
        KickInfos[_devicenum].returninfo[_id].endtime = block.timestamp;
        KickInfos[_devicenum].returninfo[_id].brakesensor = _brakesensor;
        KickInfos[_devicenum].returninfo[_id].brakewire = _brakewire;
        KickInfos[_devicenum].returninfo[_id].speedwire = _speedwire;
    
        require ((_brakesensor >=3)&&(_brakewire > 0)&&(_speedwire > 0));
        
        bool brakeproblem = _brakeproblem;
        bool wheelproblem = _wheelproblem;
        
        if ((brakeproblem = false)||(wheelproblem = false)){
             emit reviewdefects (signer, _devicenum, _id, _brakeproblem, _wheelproblem);
        }
        
        emit reviewdefects (signer, _devicenum, _id, _brakeproblem, _wheelproblem);
        
    }
    
    event defects (address signer, uint16 devicenum, string defectuserid, uint defecttime, uint brake_sensor, uint brake_wire, uint speed_wire);
   
    function DefectKickboard (uint16 _devicenum, uint _brakesensor, uint _brakewire, uint _speedwire) public returns(string memory){  
        require (_brakesensor < 3);
        require (_brakewire == 0);
        require (_speedwire == 0);
        
        string memory defectuser = KickInfos[_devicenum].id;
        uint defecttime = KickInfos[_devicenum].defectinfo[defectuser].time; 
        KickInfos[_devicenum].defectinfo[defectuser].brakesensor = _brakesensor;
        KickInfos[_devicenum].defectinfo[defectuser].brakewire = _brakewire;
        KickInfos[_devicenum].defectinfo[defectuser].speedwire = _speedwire;
        
        emit defects (signer, _devicenum, defectuser, defecttime, _brakesensor, _brakewire, _speedwire); 
    }
    
    
    function CheckKickboard (uint16 _devicenum, uint _brakesensor, uint _brakewire, uint _speedwire, string memory _manager) public {
        KickInfos[_devicenum].managerid = _manager;
        KickInfos[_devicenum].checkinfo[_manager].checktime = block.timestamp;
        KickInfos[_devicenum].checkinfo[_manager].brakesensor = _brakesensor;
        KickInfos[_devicenum].checkinfo[_manager].brakewire = _brakewire;
        KickInfos[_devicenum].checkinfo[_manager].speedwire = _speedwire;
        KickInfos[_devicenum].managerids.push(_manager); 
    }
    
    string phrase_1 = "Check is completed";
    string phrase_2 = "The kickboard is being repaired";
    
    
    function GetKickboard_devicenum (uint16 _devicenum) public view returns (string memory, uint, string memory, uint, uint, uint) {
        string memory problem_notice;
        string memory manager_id = KickInfos[_devicenum].managerid;
        uint brake_wire = KickInfos[_devicenum].checkinfo[manager_id].brakewire;
        uint speed_wire = KickInfos[_devicenum].checkinfo[manager_id].speedwire;
        uint check_time = KickInfos[_devicenum].checkinfo[manager_id].checktime;
        uint bra_ke_sensor = KickInfos[_devicenum].checkinfo[manager_id].brakesensor;

        if ((bra_ke_sensor >=3)&&(brake_wire > 0 )&&(speed_wire > 0 )){
            problem_notice = phrase_1;
        } else {
            problem_notice = phrase_2;
        }
        
        return (manager_id, check_time, problem_notice, bra_ke_sensor, brake_wire, speed_wire);
        
    }
    
 }
  