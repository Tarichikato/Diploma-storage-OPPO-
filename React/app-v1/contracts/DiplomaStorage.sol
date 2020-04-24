pragma solidity ^0.6.6+commit.6c089d02.Linux.g++;


contract DiplomaStorage {
    uint public  diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;
    uint public degreeCount = 0;

    //Address to be modified if you want to do tests
    //Eventually we could have a mapping with the master addresses

    address master = msg.sender;


    //Association between a student and a diploma (this is how the diploma is awarded).
    struct Diploma {
        uint idDegree;
        uint idStudent;
    }

    event DiplomaCreated(
        uint idDegree,
        uint idStudent);


    //School with the address having the right to award diplomas
    struct School {
        address schoolAddress;
        uint idSchool;
        string schoolName;
    }

    event SchoolCreated(
        address schoolAddress,
        uint idSchool,
        string schoolName);

    //Diploma (one different diploma per year)
    struct Degree {
        uint idDegree;
        uint idSchool;
        uint year;
        string nameDegree;
        string schoolName;
    }

    event DegreeCreated (
        uint idDegree,
        uint idSchool,
        uint year,
        string nameDegree,
        string schoolName);

    //Student defined by Face,INE,Name, Surname, First name and date of birth
    struct Student {
        uint idStudent;
        //uint faceHash;
        uint INE;
        string firstName;
        string lastName;
        uint birth;
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



    constructor() public {

        //Creation of students
        createStudent(18821453685,"Bob", "Martin", 20072015);
        createStudent(64658482179,"Alice", "Durand", 19082008);
        createStudent(54658741246,"Mallory","Dupond",1112008);


        //Creation of schools with the master address (line 13)
        createSchool(msg.sender,"Telecom Sud Paris");
        createSchool(msg.sender,"Kryptosphere");


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

    //Relatively low level function to award diplomas (it is necessary to know the id of the pupil and the id of the diploma that one wants to award)

    function createDiplomaLL(uint _idDegree, uint  _idStudent) internal{
        if(_idStudent <= studentCount && _idDegree <= degreeCount){
            Degree memory deg = degrees[_idDegree];
            uint idSch = deg.idSchool;
            School memory sch = schools[idSch];

            //  We check that the address that is trying to assign a diploma is the one that created the diploma.

            if(sch.schoolAddress == msg.sender){
                diplomaCount ++;
                diplomas[diplomaCount] = Diploma(_idDegree,_idStudent);
                emit DiplomaCreated(_idDegree,_idStudent);

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
        }

        //If the diploma doesn't exist, we don't create it, otherwise we risk creating new diplomas every time we make a typing mistake.
        if(idD == 0){
        }
        else{

        //We create the association

        createDiplomaLL(idD,idS);
        }
    }

    function createStudent(uint _INE,string memory _firstName, string memory _lastName,uint _birth) public{
        if (checkStudent(_INE,_firstName,_lastName,_birth) == 0){
            studentCount ++;
            students[studentCount] = Student(studentCount,_INE, _firstName,_lastName, _birth);
            emit StudentCreated(studentCount,_INE,_firstName,_lastName,_birth);
        }

    }

    function createSchool( address _schoolAdress, string memory _schoolName) public returns(string memory){
        if(msg.sender != master){

            //We get in here if we try to create a school without being the manager of the smart contract.
            //This is necessary because if someone was able to create schools he could create and award diplomas and this would lead to disaster

            return("No servant can serve two masters (Luc 16:13)");

        }
        if (checkSchool(_schoolAdress,_schoolName) == 0){
            schoolCount ++;
            schools[schoolCount] = School(_schoolAdress, schoolCount,_schoolName);
            emit SchoolCreated(_schoolAdress, schoolCount,_schoolName);
            return("SchoolCreated");
        }
        else{
            return("School already exists");
        }
    }



    function createDegree(uint _year,string memory _nameDegree, string memory _schoolName) public {
        School memory sch;
        uint idSch = 0;
        for(uint i = 0; i <= schoolCount; i++){
            sch=schools[i];
            if(sch.schoolAddress == msg.sender && keccak256(abi.encodePacked(sch.schoolName)) == keccak256(abi.encodePacked(_schoolName))){
                idSch = i;
            }
        }
        if (idSch != 0){
            degreeCount ++;
            degrees[degreeCount] = Degree(degreeCount,idSch, _year,_nameDegree, _schoolName);
            emit DegreeCreated(degreeCount,idSch, _year,_nameDegree,_schoolName);
        }
    }


    /**
    EXISTENCE CHECK FUNCTIONS----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    That is to say one enters the characteristics of the searched object and the function returns a uint which is the id
    0 if the object does not exist

    WARNING ids start at 1 !

     */


    function checkSchool(address _schoolAddress,string memory _schoolName) public view returns (uint){
        School memory sch;
        for (uint i = 1; i <= schoolCount;i++){
            sch = schools[i];
            if(sch.schoolAddress == _schoolAddress && keccak256(abi.encodePacked(sch.schoolName)) == keccak256(abi.encodePacked(_schoolName))){
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
            if(keccak256(abi.encodePacked(deg.nameDegree)) == keccak256(abi.encodePacked(_nameDegree)) && keccak256(abi.encodePacked(deg.schoolName)) == keccak256(abi.encodePacked(_schoolName))){
                if(deg.year == _year){
                    return(i);
                }
            }
        }
        return(0);
    }







    function checkDiploma(uint _INE,string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public view returns(bool) {
        uint degreeId = checkDegree(_dYear, _nameDegree,_schoolName);
        uint studentId = checkStudent(_INE,_firstName,_lastName,_birth);

        Diploma memory dip;

        // If the student and the diploma exist, we will check if such an association exists

        if(studentId != 0 && degreeId != 0){
            for(uint k = 1; k <= diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == studentId && dip.idDegree == degreeId){
                    return true;
                }
            }
        }
        return false;
    }


    //Function to check a diploma without knowing the INE
    /**
     * If the student exists in duplicate, the INE is requested
     **/

    function checkDiplomaNoINE(string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public view returns(string memory){
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
