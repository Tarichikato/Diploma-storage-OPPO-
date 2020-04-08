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

    await App.renderStudents()

    // Update loading state
    App.setLoading(false)
  },

  renderStudents: async () => {
        var content = $("#content")
        // Load the total task count from the blockchain
        const studentCount = await App.diplomaStorage.studentCount()

        var studentsResults = $("#studentsResults")

        // Render out each task with a new task template
        for (var i = 1; i <= studentCount; i++) {
          // Fetch the task data from the blockchain
          const student = await App.diplomaStorage.students(i)
          const idStudent = student[0].toNumber()
          const iNE = student[1].toNumber()
          const studentFirstName = student[2]
          const studentLastName = student[3]
          const studentBirth = student[4].toNumber()

          var studentsTemplate = "<tr><th>" + idStudent + "</th><td>" + iNE + "</td><td>" + studentFirstName + "</td><td>" + studentLastName + "</td><td>" + studentBirth + "</td></tr>"
          studentsResults.append(studentsTemplate)

          content.show()
        }
      },

      createStudent: async () => {
        App.setLoading(true)
        const iNE = $('#newStudentINE').val()
        const studentFirstName = $('#newStudentFName').val()
        const studentLastName = $('#newStudentLName').val()
        const studentbirth = $('#newStudentBirth').val()
        await App.diplomaStorage.createStudent(iNE, studentFirstName, studentLastName, studentbirth)
        window.location.reload()
      },


  setLoading: (boolean) => {
   App.loading = boolean
   const loader = $('#loader')
   const iNE = $('#iNE')
   const studentFirstName = $('#studentFirstName')
   const studentLastName = $('#studentLastName')
   const studentbirth = $('#studentBirth')

   if (boolean) {
     loader.show()
     iNE.hide()
     studentFirstName.hide()
     studentLastName.hide()
     studentbirth.hide()
   } else {
     loader.hide()
     studentFirstName.show()
     studentLastName.show()
     iNE.show()
     studentbirth.show()
 }
}
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
