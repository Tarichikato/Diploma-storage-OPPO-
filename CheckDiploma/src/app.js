App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    App.account = web3.eth.accounts[0]
    console.log(App.account)
  },

  loadContract: async () => {
    const diplomaStorage = await $.getJSON('DiplomaStorage.json')
    App.contracts.DiplomaStorage = TruffleContract(diplomaStorage)
    App.contracts.DiplomaStorage.setProvider(App.web3Provider)
    console.log(diplomaStorage)

    App.diplomaStorage = await App.contracts.DiplomaStorage.deployed()
  },

  render: async () => {
    if (App.loading) {
      return
    }

    //Update app loading taskTemplate
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render student
    //wait App.renderStudents()

    // Render diploma
    // await App.renderDiplomas()

    await App.checkDiploma()


    // Update loading state
    App.setLoading(false)
  },

  // renderStudents: async () => {
  //     // Load the total task count from the blockchain
  //     const studentCount = await App.diplomaStorage.studentCount()
  //     const $studentTemplate = $('.studentTemplate')
  //
  //     // Render out each task with a new task template
  //     for (var i = 1; i <= studentCount; i++) {
  //       // Fetch the task data from the blockchain
  //       const student = await App.diplomaStorage.students(i)
  //       const idStudent = student[0].toNumber()
  //       const iNE = student[1].toNumber()
  //       const studentFirstName = student[2]
  //       const studentLastName = student[3]
  //       const studentBirth = student[4].toNumber()
  //
  //       // Affiche le nom, la date de naissance et l'ID de l'étudiant.
  //       const $newStudentTemplate = $studentTemplate.clone()
  //       $newStudentTemplate.find('.studentFirstName').html(studentFirstName)
  //       $newStudentTemplate.find('.studentLastName').html(studentLastName)
  //       $newStudentTemplate.find('.studentBirth').html(studentBirth)
  //       $newStudentTemplate.find('.idStudent').html(idStudent)
  //       $newStudentTemplate.find('.iNE').html(iNE)
  //       $newStudentTemplate.find('input')
  //                       .prop('name', idStudent)
  //
  //       $('#studentList').append($newStudentTemplate)
  //
  //       // Show the student
  //       $newStudentTemplate.show()
  //     }
  //   },

//     renderDiplomas: async () => {
//         // Load the total task count from the blockchain
//         const diplomaCount = await App.diplomaStorage.diplomaCount()
//         const $diplomaTemplate = $('.diplomaTemplate')
//
//         // Render out each task with a new task template
//         for (var i = 1; i <= diplomaCount; i++) {
//           // Fetch the task data from the blockchain
//           const diploma = await App.diplomaStorage.diplomas(i)
//           const ine = diploma[0].toNumber()
//           const firstname = diploma[1]
//           const lastname = diploma[2]
//           const birth = diploma[3].toNumber()
//           const yearDegree = diploma[4].toNumber()
//           const namedegree = diploma[5]
//           const schoolname = diploma[6]
//
// //createDiploma(64658482179,"Alice", "Durand", 19082008,2023,"Blockchain Developer","Kryptosphere");
//           // Affiche le nom, la date de naissance et l'ID de l'étudiant.
//           const $newDiplomaTemplate = $diplomaTemplate.clone()
//           $newDiplomaTemplate.find('.ine').html(ine)
//           $newDiplomaTemplate.find('.firstname').html(firstname)
//           $newDiplomaTemplate.find('.lastname').html(lastname)
//           $newDiplomaTemplate.find('.birth').html(birth)
//           $newDiplomaTemplate.find('.yearDegree').html(yearDegree)
//           $newDiplomaTemplate.find('.namedegree').html(namedegree)
//           $newDiplomaTemplate.find('.schoolname').html(schoolname)
//           $newDiplomaTemplate.find('input')
//                           .prop('name', ine)
//
//           $('#diplomaList').append($newDiplomaTemplate)
//
//           // Show the student
//           $newDiplomaTemplate.show()
//         }
//       },


    //Cette partie permet de créer un étudiant sur le HTML
  // createStudent: async () => {
  //   App.setLoading(true)
  //   const iNE = $('#newStudentINE').val()
  //   const studentFirstName = $('#newStudentFName').val()
  //   const studentLastName = $('#newStudentLName').val()
  //   const studentbirth = $('#newStudentBirth').val()
  //   await App.diplomaStorage.createStudent(iNE, studentFirstName, studentLastName, studentbirth)
  //   window.location.reload()
  // },

  checkDiploma: async() => {
    App.setLoading(true)
    const diplomaCount = await App.diplomaStorage.diplomaCount()
    for (var i = 1; i <= diplomaCount; i++) {
      // Fetch the task data from the blockchain
      const diploma = await App.diplomaStorage.diplomas(i)
      const idDegree = diploma[0].toNumber()
      const idStudent = diploma[1].toNumber()
    }

    const studentCount = await App.diplomaStorage.studentCount()
    const $checkStudentTemplate = $('.checkStudentTemplate')

    for (var j = 1; j <= studentCount; j++) {
      const student = await App.diplomaStorage.students(j)
      const idStudent = student[0].toNumber()
      const iNE = student[1].toNumber()
      const studentFirstName = student[2]
      const studentLastName = student[3]
      const studentBirth = student[4].toNumber()
      const studentID = (await App.diplomaStorage.checkStudent(iNE, studentFirstName, studentLastName, studentBirth)).toNumber()

      const $newCheckStudentTemplate = $checkStudentTemplate.clone()
      $newCheckStudentTemplate.find('.studentID').html(studentID)
      $newCheckStudentTemplate.find('.studentFirstName').html(studentFirstName)
      $newCheckStudentTemplate.find('input')


      $('#studentList').append($newCheckStudentTemplate)
      //$newCheckStudentTemplate.show()


    const degreeCount = await App.diplomaStorage.degreeCount()

    for (var k = 1; k <= degreeCount; k++) {
      const degree = await App.diplomaStorage.degrees(k)
      const idDegree = degree[0].toNumber()
      const idSchool = degree[1].toNumber()
      const dYear = degree[2].toNumber()
      const nameDegree = degree[3]
      const schoolName = degree[4]
      const degreeID = (await App.diplomaStorage.checkDegree(dYear, nameDegree, schoolName)).toNumber()

      $newCheckStudentTemplate.find('.degreeID').html(degreeID)
      $newCheckStudentTemplate.find('input')
                              .prop('name', idSchool)


      $newCheckStudentTemplate.show()
    }
  }

    const schoolCount = await App.diplomaStorage.schoolCount()
    for (var l = 1; l <= schoolCount; l++) {
      const school = await App.diplomaStorage.schools(l)
      const schoolAddress = school[0]
      const schoolCount = school[1]
      const schoolName = school[2]
    }

    // await App.diplomaStorage.checkDiploma(iNE, studentFirstName, studentLastName, studentBirth, dYear, nameDegree, schoolName)
    // window.location.reload()

    const iNE = $('#checkStudentINE').val()
    const studentFirstName = $('#checkStudentFName').val()
    const studentLastName = $('#checkStudentLName').val()
    const studentBirth = $('#checkStudentBirth').val()
    // const dYear = $('#checkDegreeYear').val()
    // const nameDegree = $('#checkNamedegree').val()
    // const schoolName = $('#checkSchoolName').val()



},


  setLoading: (boolean) => {
   App.loading = boolean
   const loader = $('#loader')
   const iNE = $('#iNE')
   const studentFirstName = $('#studentFirstName')
   const studentLastName = $('#studentLastName')
   const studentbirth = $('#studentBirth')
   const dYear = $('#dYear')
   const nameDegree = $('#nameDegree')
   const schoolName = $('#schoolName')

   if (boolean) {
     loader.show()
     iNE.hide()
     studentFirstName.hide()
     studentLastName.hide()
     studentbirth.hide()
     dYear.hide()
     nameDegree.hide()
     schoolName.hide()
   } else {
     loader.hide()
     studentFirstName.show()
     studentLastName.show()
     iNE.show()
     studentbirth.show()
     dYear.show()
     nameDegree.show()
     schoolName.show()
   }
 }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
