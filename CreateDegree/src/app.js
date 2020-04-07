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


    await App.renderDegrees()

    await App.createDegree()

    // Update loading state
    App.setLoading(false)
  },

  renderDegrees: async () => {
    App.contracts.DiplomaStorage.deployed()
        var loader = $("#loader")
        var content = $("#content")
        // Load the total task count from the blockchain

        var degreesResults = $("#degreesResults")

        const degreeCount = await App.diplomaStorage.degreeCount()

        for (var k = 1; k <= degreeCount; k++) {
          const degree = await App.diplomaStorage.degrees(k)
          const idDegree = degree[0].toNumber()
          const idSchool = degree[1].toNumber()
          const dYear = degree[2].toNumber()
          const nameDegree = degree[3]
          const schoolName = degree[4]

          var degreesTemplate = "<tr><th>" + idDegree + "</th><td>" + idSchool + "</td><td>" + dYear + "</td><td>" + nameDegree + "</td><td>" + schoolName + "</td></tr>"
          degreesResults.append(degreesTemplate)

          content.show()

        }
      },

      createDegree: async () => {
        App.setLoading(true)
        const yearDegree = $('#newYearDegree').val()
        const nameDegree = $('#newNameDegree').val()
        const schoolName = $('#newSchoolName').val()
        await App.diplomaStorage.createDegree(yearDegree, nameDegree, schoolName)
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
