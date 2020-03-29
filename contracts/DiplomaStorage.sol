pragma solidity ^0.5.16;


contract DiplomaStorage {
    uint public  diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;
    uint public degreeCount = 0;
    
    //Adresse à modifier si tu veux faire des tests
    //A terme on pourrait avoir un mapping avec les adresses master
    
    address master = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;


    //Association entre un élève et un diplome (c'est comme ça qu'on descerne le diplome)
    struct Diploma {
        uint idDegree;
        uint idStudent;
    }

    event DiplomaCreated(
        uint idDegree,
        uint idStudent);

    
    //Ecole avec l'adresse ayant le droit de descerner les diplomes
    struct School {
        address schoolAddress;
        uint idSchool;
        string schoolName;
    }

    event SchoolCreated(
        address schoolAddress,
        uint idSchool,
        string schoolName);

    //Diplome (un diplome different par promotion)
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

    //Elève défini par Nom Prenom et date de naissance (on pourrai rajouter des champs à terme)
    struct Student {
        uint idStudent;
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
        createStudent(12,"Rudy", "Deflisque", 8071999);
        createStudent(64679,"Pierre", "Lourdelet", 28041999);
        createStudent(54646,"Noheila", "Lurot", 16081999);

       
        createSchool(msg.sender,"TSP");
        createSchool(msg.sender,"Arts et Métiers Lille");
        
        createDegree(2022,"Ingé","TSP");
        createDegree(2023,"Ingé","Arts et Métiers Lille");

        createDiplomaLL(2,3);
        createDiplomaLL(1,1);
        createDiplomaLL(1,2);
    }


    /**
     * FONCTIONS DE CREATION ----------------------------------------------------------------------------------------------------------------------------------
     * 
     */

    //fonction pour descerner des diplomes assez bas niveau (Il faut connaitre l'id de l'éleve et du diplome que l'on veut descerner)
    
    function createDiplomaLL(uint _idDegree, uint  _idStudent) public returns (bool){
        if(_idStudent <= studentCount && _idDegree <= degreeCount){
            Degree memory deg = degrees[_idDegree];
            uint idSch = deg.idSchool;
            School memory sch = schools[idSch];
            
            // On vérifie que l'adresse qui essaie d'attribuer un diplomes est bien celle qui à créé le diplome
            
            if(sch.schoolAddress == msg.sender){
                diplomaCount ++;
                diplomas[diplomaCount] = Diploma(_idDegree,_idStudent);
                emit DiplomaCreated(_idDegree,_idStudent);
                return(true);
                
            }
        }
        return(false);
    }
    
    //fonction plus haut niveau
    
    function createDiplomaHL(uint _INE,string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public returns(bool){
        uint idS = checkStudent(_INE,_firstName,_lastName,_birth);
        uint idD = checkDegree(_dYear,_nameDegree,_schoolName);
        
        //Si l'elève n'existe pas on le cree
        if(idS == 0){
            createStudent(_INE,_firstName,_lastName,_birth);
        }
        
        //Si le diplome n'existe pas on ne le crèe pas sinon on risque de creer des diplomes à chaque faute de frappe
        if(idD == 0){
            return(false);
        }
        else{
        
        //On crèe l'association
        createDiplomaLL(idD,idS);
        return(true);
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
            
            //On entre ici si on essaie de créer une école sans etre le gérant du smart contract 
            //C'est nécessaire car si quelqu'un etait capable de crer des ecoles il pourrait creer des diplomes et go catastrophe
            
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
    FONCTIONS DE VERIFICATION D'EXISTENCE----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    C'est à dire on entre les caracteristiques de l'objet cherché et la fonction renvoie un uint 
    0 si l'objet existe pas
    Son id si il existe
    ATTENTION les ids commencent à 1
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

        // Si l'eleve et le diplome exitent on va vérifier si il existe une telle association
        
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
    
    
    //Fonction pour vérifier un diplome sans connaitre l'INE 
    /**
     * Si l'eleve existe en double on demande l'INE
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

        // Si l'eleve et le diplome exitent on va vérifier si il existe une telle association
        
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