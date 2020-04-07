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


    await App.checkDiploma()


    // Update loading state
    App.setLoading(false)
  },

  checkDiploma: async() => {
    App.setLoading(true)
    App.contracts.DiplomaStorage.deployed()

    var loader = $("#loader")
    var content = $("#content")

    var infosResults = $("#infosResults")

    const studentCount = await App.diplomaStorage.studentCount()

    for (var j = 1; j <= studentCount; j++) {
      const student = await App.diplomaStorage.students(j)
      const idStudent = student[0].toNumber()
      const iNE = student[1].toNumber()
      const studentFirstName = student[2]
      const studentLastName = student[3]
      const studentBirth = student[4].toNumber()
      const studentID = (await App.diplomaStorage.checkStudent(iNE, studentFirstName, studentLastName, studentBirth)).toNumber()


    const degreeCount = await App.diplomaStorage.degreeCount()

    for (var k = 1; k <= degreeCount; k++) {
      const degree = await App.diplomaStorage.degrees(k)
      const idDegree = degree[0].toNumber()
      const idSchool = degree[1].toNumber()
      const dYear = degree[2].toNumber()
      const nameDegree = degree[3]
      const schoolName = degree[4]
      const degreeID = (await App.diplomaStorage.checkDegree(dYear, nameDegree, schoolName)).toNumber()



    const schoolCount = await App.diplomaStorage.schoolCount()
    for (var l = 1; l <= schoolCount; l++) {
      const school = await App.diplomaStorage.schools(l)
      const schoolAddress = school[0]
      const schoolCount = school[1]
      const schoolName = school[2]

      var diploma = await App.diplomaStorage.checkDiploma(iNE, studentFirstName, studentLastName, studentBirth, dYear, nameDegree, schoolName)

      var infosTemplate = "<tr><th>" + studentID + "</th><td>" + degreeID + "</td><td>" + iNE + "</td><td>" + studentFirstName + "</td><td>" + studentLastName + "</td><td>" + studentBirth + "</td><td>" + dYear + "</td><td>" + nameDegree + "</td><td>" + schoolName + "</td><td>" + diploma + "</td><tr>"
      infosResults.append(infosTemplate)

      content.show()

    }
    }
  }


    // window.location.reload()

    const iNE = $('#checkStudentINE').val()
    const studentFirstName = $('#checkStudentFName').val()
    const studentLastName = $('#checkStudentLName').val()
    const studentBirth = $('#checkStudentBirth').val()
    const dYear = $('#checkDegreeYear').val()
    const nameDegree = $('#checkNamedegree').val()
    const schoolName = $('#checkSchoolName').val()



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
