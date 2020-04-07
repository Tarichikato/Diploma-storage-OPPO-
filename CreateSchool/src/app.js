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


    await App.renderSchools()

    await App.createSchool()

    // Update loading state
    App.setLoading(false)
  },

  renderSchools: async () => {
    App.contracts.DiplomaStorage.deployed()
        var loader = $("#loader")
        var content = $("#content")
        // Load the total task count from the blockchain

        var schoolsResults = $("#schoolsResults")

        const schoolCount = await App.diplomaStorage.schoolCount()
            for (var l = 1; l <= schoolCount; l++) {
              const school = await App.diplomaStorage.schools(l)
              const schoolAddress = school[0]
              const idSchool = school[1].toNumber()
              const schoolName = school[2]

          var schoolsTemplate = "<tr><th>" + schoolAddress + "</th><td>" + idSchool + "</td><td>" + schoolName + "</td></tr>"
          schoolsResults.append(schoolsTemplate)

          content.show()
          loader.hide()
        }
      },

      createSchool: async () => {
        App.setLoading(true)
        const schoolAddress = $('#newSchoolAddress').val()
        const schoolName = $('#newSchoolName').val()
        await App.diplomaStorage.createSchool(schoolAddress, schoolName)
      },



  setLoading: (boolean) => {
   App.loading = boolean
   const loader = $('#loader')
   const schoolAddress = $('#schoolAddress')
   const idSchool = $('#idSchool')
   const schoolName = $('#schoolName')

   if (boolean) {
     loader.show()
     schoolAddress.hide()
     idSchool.hide()
     schoolName.hide()
   } else {
     loader.hide()
     schoolAddress.show()
     idSchool.show()
     schoolName.show()
 }
}
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
