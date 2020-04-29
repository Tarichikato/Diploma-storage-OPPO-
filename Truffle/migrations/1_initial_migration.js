const Migrations = artifacts.require("Migrations");
const DS = artifacts.require("DiplomaStorage");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(DS);
};
