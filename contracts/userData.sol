// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.8;

contract UserData {
    struct User {
        uint256 userID;
        string username;
        string pwd;
        string firstName;
        string lastName;
        string userEmail;
    }

    address owner;

    User public removeMe;

    mapping (uint => User) public users;
    User[] public userArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // If the userID has already been set up, the updateTransaction method would be called instead
    function setUser(string memory username, string memory pwd, 
                     string memory firstName, string memory lastName, string memory userEmail) public onlyOwner {
        uint256 userID = userArray.length; 

        if (users[userID].userID == 0) {
            User memory user = User(userID, username, pwd, firstName, lastName, userEmail);
            users[userID] = user;
            userArray.push(user);
        }
        else {
            updateUser(userID, username, pwd, firstName, lastName, userEmail);
        }
    }

    function getUser(uint256 userID) public view returns (string memory, string memory, string memory, string memory, string memory) {
        require(users[userID].userID != 0, "User is not available");
        User memory user = users[userID];
        return (user.username, user.pwd, user.firstName, user.lastName, user.userEmail);
    }

    function getAllUsers() public view returns (User[] memory) {
        return userArray;
    }

    function updateUser(uint256 userID, string memory username, string memory pwd, 
                        string memory firstName, string memory lastName, string memory userEmail) public onlyOwner() {
        require(users[userID].userID != 0, "User is not available");

        deleteUser(userID);

        User memory user = User(userID, username, pwd, firstName, lastName, userEmail);
        users[userID] = user;
        userArray.push(user);
    }

    // Delete a user in the array by swap it with the last element, then remove that
    function deleteUser(uint256 userID) public onlyOwner() {
        require(users[userID].userID != 0, "User is not available");
        delete users[userID];

        for (uint i = 0; i < userArray.length; i++) {
            if (userArray[i].userID == userID) {
                removeMe = userArray[i];
                userArray[i] = userArray[userArray.length - 1];
                userArray[userArray.length - 1] = removeMe;
            }
        }
        userArray.pop();
    }
}