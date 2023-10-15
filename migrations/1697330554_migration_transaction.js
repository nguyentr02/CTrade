const TransactionData = artifacts.require("TransactionData");

module.exports = function (deployer) {
    deployer.deploy(TransactionData);
};
