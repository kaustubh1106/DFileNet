var MyContract = artifacts.require("Filetransfer");

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};