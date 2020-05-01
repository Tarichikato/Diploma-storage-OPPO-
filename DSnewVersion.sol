pragma solidity ^0.5.16;


contract DiplomaStorage {
    uint public diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;
    uint public degreeCount = 0;
    uint public masterCount = 0;
    
    //Address to be modified if you want to do tests
    address payable public master = msg.sender;
    
    
    
  




    //Association between a student and a diploma (this is how the diploma is awarded).
    struct Diploma {
        uint idDegree;
        uint idStudent;
        bool valid;
        address creator;
    }

    event DiplomaCreated(
        uint idDegree,
        uint idStudent,
        bool valid,
        address creator);

    
    //School with the address having the right to award diplomas
    struct School {
        uint id;
        string name;
        mapping (uint => address) lv1;
        mapping (uint => address) lv2;
        uint count1;
        uint count2;
        address editor;
    }
    
    event SchoolCreated(
        uint idSchool,
        string schoolName,
        address editor);

    //Diploma (one different diploma per year)
    struct Degree {
        uint id;
        string name;
        string schoolName;
        uint year;
        uint schoolId;
        address editor;
     
    }

    event DegreeCreated (
        uint idDegree,
        uint idSchool,
        uint year,
        string nameDegree,
        string schoolName);

    //Student defined by INE,Name,First name and date of birth
    struct Student {
        uint id;
        uint INE;
        string firstName;
        string lastName;
        uint birth;
        address editor;
    }

    event StudentCreated(
        uint idStudent,
        uint INE,
        string firstName,
        string lastName,
        uint birth);




    mapping(uint => Diploma) public diplomas;

    mapping(uint => Student) public students;

    mapping(uint => School) public schools;

    mapping(uint => Degree) public degrees;
    
    mapping(uint => address) public masters;
    
                
    
    



    constructor() public {
        
        addMaster(msg.sender)
       
       
        //Creation of students
        createStudent(18821453685,"Bob", "Martin", 20072015);
        createStudent(64658482179,"Alice", "Durand", 19082008);
        createStudent(54658741246,"Mallory","Dupond",1112008);
       
       
        //Creation of schools with the master address (line 13)
        createSchool("Telecom Sud Paris",msg.sender);
        createSchool("Kryptosphere",msg.sender);
        
        
        //Creation of diplomas to be awarded
        createDegree(2022,"Blockchain Engineer","Telecom Sud Paris");
        createDegree(2023,"Blockchain Developer","Kryptosphere");

        //Awarding of diplomas
        createDiploma(18821453685,"Bob","Martin",20072015,2022,"Blockchain Engineer", "Telecom Sud Paris");
        createDiploma(64658482179,"Alice", "Durand", 19082008,2023,"Blockchain Developer","Kryptosphere");
        createDiploma(18821453685,"Bob", "Martin", 20072015,2023,"Blockchain Developer","Kryptosphere");
        
        
    }
    
   


    /**
     * CREATION FUNCTIONS ----------------------------------------------------------------------------------------------------------------------------------
     * 
     */
     
     function addMaster(address _newMaster) public {
         masterCount ++;
         masters[masterCount] = _newMaster;
     }
     
     function addAddress(string memory _schoolName,address _address, uint _lv) public {
         if(_lv == 3){
             addMaster(_address);
         }
         uint idSch = checkSchool(_schoolName);
         School  storage Sch = schools[idSch];
         if (_lv == 1){
             Sch.count1 ++;
             Sch.lv1[Sch.count1] = _address;
         }
         if (_lv == 2){
             Sch.count1 ++;
             Sch.lv1[Sch.count2] = _address;
         }
     }

    //Relatively low level function to award diplomas (it is necessary to know the id of the pupil and the id of the diploma that one wants to award)
    
    function createDiplomaLL(uint _idDegree, uint  _idStudent,bool _valid, address _creator) internal{
        if(_idStudent <= studentCount && _idDegree <= degreeCount){
            Degree memory deg = degrees[_idDegree];
            uint idSch = deg.schoolId;
            //School memory sch = schools[idSch];
            
            //  We check that the address that is trying to assign a diploma is the one that created the diploma.
            
            if(isAutorized(idSch,msg.sender)!=0){
                diplomaCount ++;
                diplomas[diplomaCount] = Diploma(_idDegree,_idStudent,_valid,_creator);
                emit DiplomaCreated(_idDegree,_idStudent,_valid,_creator);
                
            }
        }
    }
    
    //Relatively high level function
    
    function createDiploma(uint _INE,string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public{
        uint idS = checkStudent(_INE,_firstName,_lastName,_birth);
        uint idD = checkDegree(_dYear,_nameDegree,_schoolName);
        
        //If the student doesn't exist, we'll create one.
        if(idS == 0){
            createStudent(_INE,_firstName,_lastName,_birth);
            idS = studentCount;
        }
        
        //If the diploma doesn't exist, we don't create it, otherwise we risk creating new diplomas every time we make a typing mistake.
        if(idD == 0){
        }
        else{
            
            bool valid = false;
        
            //We create the association
            if(msg.sender == master){
                valid = true;
            }
        
            createDiplomaLL(idD,idS,valid,msg.sender);
        }
    }

    function createStudent(uint _INE,string memory _firstName, string memory _lastName,uint _birth) public{
        
        if (checkStudent(_INE,_firstName,_lastName,_birth) == 0){
            studentCount ++;
            students[studentCount] = Student(studentCount,_INE, _firstName,_lastName, _birth,msg.sender);
            emit StudentCreated(studentCount,_INE,_firstName,_lastName,_birth);
        }
        
    }

    function createSchool( string memory _schoolName,address _address2) public returns(string memory){
        if (isMaster(msg.sender) !=0){
            if (checkSchool(_schoolName) == 0){
                schoolCount ++;
                schools[schoolCount] = School(schoolCount,_schoolName,0,0,msg.sender);
                schools[schoolCount].lv2[1] = _address2;
                
                emit SchoolCreated(schoolCount,_schoolName,msg.sender);
                return("SchoolCreated");
            }
            else{
                return("School already exists");
            }
        }
        return("No man can serve two masters(Mat 6:24)");
    }
    
    

    function createDegree(uint _year,string memory _nameDegree, string memory _schoolName) public {
        School memory sch;
        uint idSch = 0;
        for(uint i = 0; i <= schoolCount; i++){
            sch=schools[i];
            if((isAutorized(i,msg.sender) != 0) && keccak256(abi.encodePacked(sch.name)) == keccak256(abi.encodePacked(_schoolName))){
                idSch = i;
            }
        }
        if (idSch != 0){
            degreeCount ++;
            degrees[degreeCount] = Degree(degreeCount,_nameDegree, _schoolName, _year,idSch, msg.sender);
            emit DegreeCreated(degreeCount,idSch, _year,_nameDegree,_schoolName);
        }
        
    }
    


    /**
    EXISTENCE CHECK FUNCTIONS----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    That is to say one enters the characteristics of the searched object and the function returns a uint which is the id
    0 if the object does not exist
    
    WARNING ids start at 1 !
    
     */
     
     //TODO
     
     //NON TESTEE
    function isAutorized(uint _idSch,address _address) public view returns (uint){
        if (isMaster(_address) != 0){
            return 3;
        }
        School storage Sch = schools[_idSch];
        for (uint i = 1;i<= Sch.count2;i++){
            if(Sch.lv2[i] == _address){
                return 2;
            }
        }
        for (uint i = 1;i<= Sch.count1;i++){
            if(Sch.lv1[i] == _address){
                return 1;
            }
        }
        //renvoie 0 1 2 ou 3 selon le niveau d'autorisation de l'addresse pour l'ecole
        return(0);
    }
    
    function isMaster(address _address) public view returns (uint){
        for ( uint i = 1; i <= masterCount;i++){
            if(masters[i] == _address){
                return(i);
            }
        }
        return(0);
    }
     
     
    function checkSchool(string memory _schoolName) public view returns (uint){
        School memory sch;
        for (uint i = 1; i <= schoolCount;i++){
            sch = schools[i];
            if( keccak256(abi.encodePacked(sch.name)) == keccak256(abi.encodePacked(_schoolName))){
                return(i);
            }
        }
        return(0);
    }
    
    
    


    function checkStudent(uint _INE,string memory _firstName, string memory _lastName, uint _birth ) public view returns(uint){
        Student memory stu;
        for (uint i = 1; i <= studentCount; i++){
            stu=students[i];
            if(stu.INE ==_INE && stu.birth == _birth){  
                if(keccak256(abi.encodePacked(stu.firstName)) == keccak256(abi.encodePacked(_firstName)) && keccak256(abi.encodePacked(stu.lastName)) == keccak256(abi.encodePacked(_lastName))){
                    return(i);
                }
            }
        }
        return(0);
    }
    
    
    
    function checkDegree(uint _year, string memory _nameDegree, string memory _schoolName) public view returns (uint){
        Degree memory deg;
        for (uint i = 1; i<= degreeCount; i++){
            deg = degrees[i];
            if(keccak256(abi.encodePacked(deg.name)) == keccak256(abi.encodePacked(_nameDegree)) && keccak256(abi.encodePacked(deg.schoolName)) == keccak256(abi.encodePacked(_schoolName))){
                if(deg.year == _year){
                    return(i);
                }
            }
        }
        return(0);
    }
    
    function getIdDiploma(uint _INE,string calldata _firstName, string calldata _lastName,uint _birth,uint _dYear,string calldata _nameDegree, string calldata _schoolName) external view returns(uint) {
        uint degreeId = checkDegree(_dYear, _nameDegree,_schoolName);
        uint studentId = checkStudent(_INE,_firstName,_lastName,_birth);
        
        Diploma memory dip;

        // If the student and the diploma exist, we will check if such an association exists
        
        if(studentId != 0 && degreeId != 0){
            for(uint k = 1; k <= diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == studentId && dip.idDegree == degreeId){
                    return k;
                }
            }
        }
        return 0;
    }





   

    function checkDiploma(uint _INE,string calldata _firstName, string calldata _lastName,uint _birth,uint _dYear,string calldata _nameDegree, string calldata _schoolName) external view returns(string memory) {
        if(_INE == 0){
            return(checkDiplomaNoINE(_firstName,_lastName,_birth,_dYear,_nameDegree,_schoolName));
        }
        uint degreeId = checkDegree(_dYear, _nameDegree,_schoolName);
        uint studentId = checkStudent(_INE,_firstName,_lastName,_birth);
        if (studentId == 0){
            return("This student doesn't exist");
        }
        if (degreeId == 0){
            return("This degree doesn't exist");
        }
        
        
        
        Diploma memory dip;

        // If the student and the diploma exist, we will check if such an association exists
        
        if(studentId != 0 && degreeId != 0){
            for(uint k = 1; k <= diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == studentId && dip.idDegree == degreeId){
                    return "OK";
                }
            }
        }
        return "No";
    }
    
    
    //Function to check a diploma without knowing the INE 
    /**
     * If the student exists in duplicate, the INE is requested
     **/
    
    function checkDiplomaNoINE(string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) internal view returns(string memory){
        
       uint studentId = 0;
       Student memory stu;
       uint c = 0;
        for (uint i = 1; i <= studentCount; i++){
            stu=students[i];
            if(stu.birth == _birth){  
                if(keccak256(abi.encodePacked(stu.firstName)) == keccak256(abi.encodePacked(_firstName)) && keccak256(abi.encodePacked(stu.lastName)) == keccak256(abi.encodePacked(_lastName))){
                    c++;
                    studentId = i;
                }
            }
        }
        if(c == 0){
            return("This student doesn't exist");
        }
        if(c > 1){
           return("Duplicate, try with INE");
        }
        if(c == 1){
            uint degreeId = checkDegree(_dYear, _nameDegree,_schoolName);
        
        Diploma memory dip;

        // If the student and the diploma exist, we will check if such an association exists.
        
        if(studentId != 0 && degreeId != 0){
            for(uint k = 1; k <= diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == studentId && dip.idDegree == degreeId){
                    return ("OK");
                }
            }
        }
        return("NO");
        }
    } 
}