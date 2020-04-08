const DiplomaStorage = artifacts.require("./DiplomaStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(DiplomaStorage);
};
