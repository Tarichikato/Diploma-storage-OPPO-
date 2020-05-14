export const contractAddress = '0x3f60320F7479B7aB8ba5ec87C5b116A5068a8f4f'

export const diplomaStorageABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idDegree",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idSchool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "year",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "nameDegree",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "schoolName",
        "type": "string"
      }
    ],
    "name": "DegreeCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idDegree",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idStudent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "DiplomaCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idSchool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "schoolName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "editor",
        "type": "address"
      }
    ],
    "name": "SchoolCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idStudent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "INE",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "birth",
        "type": "uint256"
      }
    ],
    "name": "StudentCreated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "degreeCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "degrees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "schoolName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "year",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "idSchool",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "editor",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "diplomaCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "diplomas",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "idDegree",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "idStudent",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "editor",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "master",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "masterCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "masters",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "schoolCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "schools",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "count1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "count2",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "editor",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "studentCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "students",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "birth",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "editor",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_lv",
        "type": "uint256"
      }
    ],
    "name": "addAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_dYear",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_nameDegree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "createDiploma",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birth",
        "type": "uint256"
      }
    ],
    "name": "createStudent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "createSchool",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_year",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_nameDegree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "createDegree",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idSch",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isAutorized",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isMaster",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "checkSchool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birth",
        "type": "uint256"
      }
    ],
    "name": "checkStudent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_year",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_nameDegree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "checkDegree",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_dYear",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_nameDegree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "getIdDiploma",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_INE",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_dYear",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_nameDegree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_schoolName",
        "type": "string"
      }
    ],
    "name": "checkDiploma",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export default diplomaStorageABI




