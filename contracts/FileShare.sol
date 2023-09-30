//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
contract Filetransfer{
    uint _ID=1;
    address director;
    address[] members;
    struct Member{
        string name;
        address public_key;
    }
    struct File{
        string filename;
        string CID;
        string secretkey;
        string iv;
    }
    struct Group{
        address admin;
        string grpName;
        address[] members;
        uint nooffiles;
        uint ID;
    }
    mapping(uint => File[]) filesingroup;
    constructor(){
        director = msg.sender;
    }
    function length(uint _id) view public returns(uint){
        return filesingroup[_id].length;
    }
    mapping(address => Group[]) memberstogroup;
    Group[] groups;
    function createGroup(string memory _grpname) public{
        require(bytes(_grpname).length>0,"group name required");
        for(uint i=0;i<groups.length;i++){
            if(keccak256(bytes(groups[i].grpName))==keccak256(bytes(_grpname))){ //change kafna hai
                revert("already group exist");
            }
        }
        groups.push();
        groups[_ID-1].admin=msg.sender;
        groups[_ID-1].grpName=_grpname;
        groups[_ID-1].ID=_ID;
        groups[_ID-1].members.push(msg.sender);
        memberstogroup[msg.sender].push(groups[_ID-1]);
        _ID++;
    }
    function showgroupsbyaddress(address _address) public view returns(Group[] memory){
        return memberstogroup[_address];
    }
    function showgroup() public view returns(Group[] memory){
        return groups;
    }
    function addEmployee(uint _id, address _address) public{
        require(groups[_id].admin==msg.sender,"only admin of the group can access the file");
        for(uint i=0;i<groups[_id].members.length;i++){
            if(groups[_id].members[i]==_address){
                revert("already member");
            }
        }
        groups[_id].members.push(_address);
        memberstogroup[_address].push(groups[_id]);
    } //--->done

    function showgroups() public view returns(Group[] memory){
        return groups;
    }
    function showemployees(uint _id) public view returns(address[] memory){
        return groups[_id].members;
    }                    // members batayega 
    function showfiles(uint _id,uint _id1) public view returns(string memory,string memory){
        require(isMember(_id),"only members can access the file");
        return (filesingroup[_id][_id1].filename, filesingroup[_id][_id1].CID);
    }
    function isMember(uint _id) public view returns(bool){
        for(uint i=0;i<groups[_id].members.length;i++){
            if(groups[_id].members[i]==msg.sender){
                return true;
            }
        }
        return false;
    }

    function addfile(uint _id,string memory _filename,string memory _CID,string memory _secretkey,string memory _initializationvec) public{
        require(isMember(_id),"only members can add files");
        filesingroup[_id].push(File(_filename,_CID,_secretkey,_initializationvec));
        groups[_id].nooffiles++;
    }
    function showfiles1(uint _id,uint _id1) public view returns(File memory){
        return filesingroup[_id][_id1];
    }
}