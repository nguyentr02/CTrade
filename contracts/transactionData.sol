// SPDX-License-Identifier: UNLICENSED 
pragma solidity >=0.4.22 <0.9.0;

contract TransactionData {
    struct Transaction {
        uint256 transactionID;
        uint256 userID;
        uint256 productID;
        string productName;
        uint256 amount;
        uint256 unitPrice;
        string dateTime;
        string status;
    }

    address owner;

    mapping (uint => Transaction) public transactions;
    Transaction[] public transactionArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // If the transactionID has already been setup, the updateTransaction method would be called instead
    function setTransaction(uint256 userID, uint256 productID, 
                            string memory productName, uint256 amount, uint256 unitPrice, string memory dateTime, string memory status) public onlyOwner {
        uint256 transactionID = transactionArray.length; 

        if (transactions[transactionID].transactionID == 0) {
            Transaction memory transaction = Transaction(transactionID, userID, productID, productName, amount, unitPrice, dateTime, status);
            transactions[transactionID] = transaction;
            transactionArray.push(transaction);
        }
        else {
            updateTransaction(transactionID, userID, productID, productName, amount, unitPrice, dateTime, status);
        }
    }

    function getTransaction(uint256 transactionID) public view returns (uint256, uint256, string memory, uint256, uint256, string memory, string memory) {
        require(transactions[transactionID].transactionID != 0, "Transaction is not available");
        Transaction memory transaction = transactions[transactionID];
        return (transaction.userID, transaction.productID, transaction.productName, transaction.amount, transaction.unitPrice, transaction.dateTime, transaction.status);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactionArray;
    }

    function updateTransaction(uint256 transactionID, uint256 userID, uint256 productID, 
                               string memory productName, uint256 amount, uint256 unitPrice, string memory dateTime, string memory status) public onlyOwner() {
        require(transactions[transactionID].transactionID != 0, "Transaction is not available");

        deleteTransaction(transactionID);

        Transaction memory transaction = Transaction(transactionID, userID, productID, productName, amount, unitPrice, dateTime, status);
        transactions[transactionID] = transaction;
        transactionArray.push(transaction);
    }

    Transaction public removeMe;
    
    // Delete a transaction in the array by swap it with the last element, then remove that
    function deleteTransaction(uint256 transactionID) public onlyOwner() {
        require(transactions[transactionID].transactionID != 0, "Transaction is not available");
        delete transactions[transactionID];

        for (uint i = 0; i < transactionArray.length; i++) {
            if (transactionArray[i].transactionID == transactionID) {
                removeMe = transactionArray[i];
                transactionArray[i] = transactionArray[transactionArray.length - 1];
                transactionArray[transactionArray.length - 1] = removeMe;
            }
        }
        transactionArray.pop();
    }
}