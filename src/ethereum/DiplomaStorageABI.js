export const contractAddress = '0x08180a4D9290e977203c42E58328c44E147DE93A'

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
				"internalType": "address",
				"name": "schoolAddress",
				"type": "address"
			},
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
		"name": "checkDiploma",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "checkDiplomaNoINE",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_schoolAddress",
				"type": "address"
			},
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
				"internalType": "address",
				"name": "_schoolAdress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_schoolName",
				"type": "string"
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
				"name": "idDegree",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "idSchool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "year",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "nameDegree",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "schoolName",
				"type": "string"
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
				"internalType": "address",
				"name": "schoolAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "idSchool",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "schoolName",
				"type": "string"
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
				"name": "idStudent",
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
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default diplomaStorageABI




