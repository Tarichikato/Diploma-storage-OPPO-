pragma solidity ^0.5.16;


contract DiplomaStorage {
    uint public  diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;
    uint public degreeCount = 0;


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
        address schoolAdress;
        uint idSchool;
        string schoolName;
    }

    event SchoolCreated(
        address schoolAdress,
        uint idSchool,
        string schoolName);

    //Diplome (un diplome different par promotion)
    struct Degree {
        uint idDegree;
        uint year;
        string nameDegree;
        string schoolName;
    }

    event DegreeCreated (
        uint idDegree,
        uint year,
        string nameDegree,
        string schoolName);

    //Elève défini par Nom Prenom et date de naissance (on pourrai rajouter des champs à terme)
    struct Student {
        uint idStudent;
        string firstName;
        string lastName;
        uint birth;
    }

    event StudentCreated(
        uint idStudent,
        string firstName,
        string lastName,
        uint birth);



    mapping(uint => Diploma) public diplomas;

    mapping(uint => Student) public students;

    mapping(uint => School) public schools;

    mapping(uint => Degree) public degrees;



    constructor() public {
        createStudent("Rudy", "Deflisque", 8071997);
        createStudent("Pierre", "Lourdelet", 28041999);
        createStudent("Noheila", "Lurot", 16081999);

        createDegree(2022,"Ingé","TSP");
        createDegree(2023,"Ingé","Arts et Métiers Lille");

        createSchool(msg.sender,"TSP");
        createSchool(msg.sender,"Arts et Métiers Lille");

        createDiplomaLL(2,3);
        createDiplomaLL(1,1);
        createDiplomaLL(1,2);
    }


    //fonction pour descerner des diplomes assez bas niveau (Il faut connaitre l'id de l'éleve et du diplome que l'on veut descerner)

    //à metttre en internal à terme
    
    function createDiplomaLL(uint _idDegree, uint  _idStudent) public {
        //si il existe un etudiant et une école avec ces id (peut etre ecrire des fonction pour vérifier ca histoire de garder un code lisible)
            diplomaCount ++;
            diplomas[diplomaCount] = Diploma(_idDegree,_idStudent);
            emit DiplomaCreated(_idDegree,_idStudent);
        //sinon erreur
    }
    
    //fonction plus haut niveau
    
    function createDiplomaHL(string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public returns(bool){
        uint idS = checkStudent(_firstName,_lastName,_birth);
        uint idD = checkDegree(_dYear,_nameDegree,_schoolName);
        
        //Si l'elève n'existe pas on le cree
        if(idS == 0){
            createStudent(_firstName,_lastName,_birth);
            idS = studentCount;
        }
        
        //Si le diplome n'existe pas on ne le crèe pas sinon on risque de creer des diplomes à chaque faute de frappe
        if(idD == 0){
            return(false);
        }
        
        //On crèe l'association
        createDiplomaLL(idD,idS);
        return(true);
    }

    function createStudent(string memory _firstName, string memory _lastName,uint _birth) public{
        //si l'etudiant n'existe pas encore
            studentCount ++;
            students[studentCount] = Student(studentCount, _firstName,_lastName, _birth);
            emit StudentCreated(studentCount,_firstName,_lastName,_birth);
        //sinon erreur
    }

    function createSchool( address _schoolAdress, string memory _schoolName) public {
        //si l'ecole n'existe pas encore
            schoolCount ++;
            schools[schoolCount] = School(_schoolAdress, schoolCount,_schoolName);
            emit SchoolCreated(_schoolAdress, schoolCount,_schoolName);
        //sinon erreur
    }

    function createDegree(uint _year,string memory _nameDegree, string memory _schoolName) public {
        degreeCount ++;
        degrees[degreeCount] = Degree(degreeCount, _year,_nameDegree, _schoolName);
        emit DegreeCreated(degreeCount, _year,_nameDegree,_schoolName);
    }


    //TODO 
    /**
    Ecrire des fonction qui disent si l'objet existe

    C'est à dire on entre les caracteristiques de l'objet cherché et la fonction renvoie un uint 
    0 si l'objet existe pas
    Son id si il existe
    ATTENTION les ids commencent à 1

    faire pour School
    
     */
     
     

    function checkStudent(string memory _firstName, string memory _lastName, uint _birth ) public view returns(uint){
        Student memory stu;
        for (uint i = 1; i <= studentCount; i++){
            stu=students[i];
            if(stu.birth ==_birth){  
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





   

    function checkDiploma(string memory _firstName, string memory _lastName,uint _birth,uint _dYear,string memory _nameDegree, string memory _schoolName) public view returns(bool) {
        uint degreeId = checkDegree(_dYear, _nameDegree,_schoolName);
        uint studentId = checkStudent(_firstName,_lastName,_birth);
        
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

    // à mettre en internal à terme
    function checkDiplomaLL(uint _idStudent, uint _idDegree) public view returns (bool){
        Diploma memory dip;
        if(_idDegree!= 0 && _idStudent != 0){
            for(uint k = 1; k <= diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == _idStudent && dip.idDegree == _idDegree){
                    return true;
                }
            }
        }
        return false;
    }
}