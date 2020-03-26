//const TodoList = artifacts.require("./TodoList.sol");
const Pierre = artifacts.require("./PierreDS.sol");
const Rudy = artifacts.require("./RudyDS.sol");

module.exports = function(deployer) {
  //deployer.deploy(TodoList);
  deployer.deploy(Pierre);
  deployer.deploy(Rudy);
};
