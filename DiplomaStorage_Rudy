pragma solidity ^0.5.16;

contract DiplomaStorage {
    uint public  diplomaCount = 0;
    uint public studentCount = 0;
    uint public schoolCount = 0;

    struct Diploma {
        uint diplomaCount;
        uint idDegree;
        uint idStudent;
    }

    event DiplomaCreated(
        uint diplomaCount,
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
    }

    struct Student {
        uint idStudent;
        string firstName;
        string lastName;
        uint[3] dateOfBirth;
    }

    event StudentCreated(
        uint idStudent,
        string firstName,
        string lastName,
        uint[3] dateOfBirth);



    mapping(uint => Diploma) public diplomas;

    mapping(uint => Student) public students;

    mapping(uint => School) public schools;

    mapping(uint => Degree) public degrees;



    constructor() public {
        createDiploma(1,1);
    }

    function createDiploma(uint _idDegree, uint  _idStudent) public {
        //si il existe un etudiant et une école avec ces id (peut etre ecrire des fonction pour vérifier ca histoire de garder un code lisible)
            diplomaCount ++;
            diplomas[diplomaCount] = Diploma(diplomaCount,_idDegree,_idStudent);
            emit DiplomaCreated(diplomaCount,_idDegree,_idStudent);
        //sinon erreur
    }

    function createStudent(string memory _firstName, string memory _lastName, uint[3] memory _dateOfBirth) public {
        //si l'etudiant n'existe pas encore
            studentCount ++;
            students[studentCount] = Student(studentCount,_firstName,_lastName,_dateOfBirth);
            emit StudentCreated(studentCount,_firstName,_lastName,_dateOfBirth);
        //sinon erreur
    }

    function createSchool(string memory _schoolName) public {
        //si l'ecole n'existe pas encore
            schoolCount ++;
            schools[schoolCount] = School(schoolCount,_schoolName);
            emit SchoolCreated(schoolCount,_schoolName);
        //sinon erreur
    }



}
