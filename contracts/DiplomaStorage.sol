pragma solidity ^0.5.16;

contract DiplomaStorage {
    uint public  diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;
    uint public degreeCount = 0;

    struct Diploma {
        uint idDegree;
        uint idStudent;
    }

    event DiplomaCreated(
        uint idDegree,
        uint idStudent);

    struct School {
        uint idSchool;
        string schoolName;
    }

    event SchoolCreated(
        uint idSchool,
        string schoolName);

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


    struct Student {
        uint idStudent;
        string firstName;
        string lastName;
        uint day;
        uint month;
        uint year;
    }

    event StudentCreated(
        uint idStudent,
        string firstName,
        string lastName,
        uint day,
        uint month,
        uint year);



    mapping(uint => Diploma) public diplomas;

    mapping(uint => Student) public students;

    mapping(uint => School) public schools;

    mapping(uint => Degree) public degrees;



    constructor() public {
        createStudent("Rudy", "Deflisque", 8, 7, 1999);
        createStudent("Pierre", "Lourdelet", 28, 4, 1999);
        createStudent("Noheila", "Lurot", 16, 8, 1999);

        createDegree(2022,"Ingé","TSP");

        createSchool("TSP");

        createDiploma(1,3);



    }

    function createDiploma(uint _idDegree, uint  _idStudent) public {
        //si il existe un etudiant et une école avec ces id (peut etre ecrire des fonction pour vérifier ca histoire de garder un code lisible)
            diplomaCount ++;
            diplomas[diplomaCount] = Diploma(_idDegree,_idStudent);
            emit DiplomaCreated(_idDegree,_idStudent);
        //sinon erreur
    }

    function createStudent(string memory _firstName, string memory _lastName, uint _day, uint _month, uint _year) public {
        //si l'etudiant n'exi ste pas encore
            studentCount ++;
            students[studentCount] = Student(studentCount, _firstName, _lastName, _day, _month, _year);
            emit StudentCreated(studentCount,_firstName,_lastName, _day, _month, _year);
        //sinon erreur
    }

    function createSchool(string memory _schoolName) public {
        //si l'ecole n'existe pas encore
            schoolCount ++;
            schools[schoolCount] = School(schoolCount,_schoolName);
            emit SchoolCreated(schoolCount,_schoolName);
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

    faire pour Students,Degree,School
    
     */





    // Cette fonction ne marche pas
    
    function checkDiploma(string memory _firstName, string memory _lastName, uint _year,uint _day, string memory _nameDegree, string memory _schoolName) public view returns(bool) {
        Student memory stu;
        Diploma memory dip;
        Degree memory deg;


        uint idS;
        bool studentExists = true;

        uint idD;
        bool degreeExists = true;

        //On parcours les eleves pour savoir si il existe puis on note son identifiant
        for (uint i = 0; i < studentCount; i++){
            stu = students[i];
            if(stu.day == _day ){  
                if(keccak256(abi.encodePacked(stu.firstName)) == keccak256(abi.encodePacked(_firstName)) && keccak256(abi.encodePacked(stu.lastName)) == keccak256(abi.encodePacked(_lastName))){
                    idS = i +1;
                    studentExists = true;
                }
                
            }
        }

        //On parcours les diplomes pour savoir si il existe puis on note son identifiant
        for (uint i = 0; i < degreeCount; i++){
            deg = degrees[i];
            if(deg.year == _year ){
                if(keccak256(abi.encodePacked(deg.schoolName)) == keccak256(abi.encodePacked(_schoolName)) && keccak256(abi.encodePacked(deg.nameDegree)) == keccak256(abi.encodePacked(_nameDegree))){
                    idD = i +1;
                    degreeExists = true;

                }
                
            }
        }

        // Si l'eleve et le diplome exitent on va vérifier si il existe une telle association
        if(studentExists && degreeExists){
            return true;
            for(uint k = 0; k < diplomaCount;k++){
                dip = diplomas[k];
                if (dip.idStudent == 3 && dip.idDegree == 1){
                    return true;
                }
            }
        }
        return false;

        
    
    }



}
