const mysql = require("mysql");
const express = require("express");
const server = express();
server.use(express.json());
// This line enables JSON body parsing

// Create connection to MySQL
var db = mysql.createConnection({
  host: "ictstu-db1.cc.swin.edu.au",
  user: "s103500095",
  password: "161202",
  database: "s103500095_db",
});

// Check Connection with Database
db.connect(function (err) {
  if (err) {
    console.log("Error connecting to database");
  } else {
    console.log("Succesfully connected to Database");
  }
});

// Check Connection with BE server, starting the PORT
server.listen(8080, function check(err) {
  if (err) {
    console.log("Cannot connect to BE");
    console.log(err);
  } else {
    console.log("Successed");
  }
});
// Fixing CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ----------------------------------------------------------------------------------------------------------------

// Get USER Data using UserID_____________
server.get("/users/id/:id", (req, res) => {
  var userID = req.params.id;
  var sql = "SELECT * FROM ContractUser WHERE UserID = ?";
  db.query(sql,[userID], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.send({ status: true, result });
    }
  });
});


// ---------- View data in User Table - checked ----------
server.get("/users/all", (req, res) => {
  var sql = "SELECT * FROM ContractUser";
  db.query(sql, function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//--------- Search Email in User Table - checked ----------
server.get("/users/getEmail/:email", (req, res) => {
  var userEmail = req.params.email;
  var sql = "SELECT * FROM ContractUser WHERE UserEmail = ?";
  db.query(sql, [userEmail], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot find the user's email" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//--------- Search Email,Password in User Table - checked ----------
server.get("/users/checkPassword/:email/:password", (req, res) => {
  var userEmail = req.params.email;
  var userPassword = req.params.password;
  var detail = [userEmail, userPassword];
  // res.json(detail)
  var sql = "SELECT * FROM ContractUser WHERE UserEmail = ? AND pwd = ?";
  db.query(sql, detail, function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot find the user's email" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// ------- Test insert user signup into db - checked ---------
server.post("/users/signUp", (req, res) => {
  let detail = {
    UserName: req.body.userName,
    pwd: req.body.password,
    FirstName: req.body.fName,
    LastName: req.body.lName,
    UserEmail: req.body.userEmail,
  };

  // let sql = "INSERT INTO ContractUser SET ?";
  // db.query(sql, detail, function (err) {
  // CANNOT use like this because SET is used for UPDATE only not INSERT

  let sql =
    "INSERT INTO ContractUser (UserName, pwd, FirstName, LastName, UserEmail) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      detail.UserName,
      detail.pwd,
      detail.FirstName,
      detail.LastName,
      detail.UserEmail,
    ],
    function (err) {
      //for testing the details, can be removed later
      console.log("Received request body:", req.body);
      if (err) {
        console.error("Error executing SQL query:", err);
        res
          .status(500)
          .send({ status: false, error: "Cannot add user details" });
      } else {
        res.send({ status: true, message: "Added" });
      }
    }
  );
});
// _____________________Get Product by ID
server.get("/products/ID/:id", (req,res) => {
  var prodID = req.params.id;
  var sql = "SELECT * FROM ContractProduct WHERE ProdID = ?";
  db.query(sql, [prodID], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.json({status: true, result});
    }
  });
}) 


// ------------ Test add product - checked -------------
server.post("/products/add", (req, res) => {
  let detail = {
    ProdName: req.body.name,
    ProdPrice: req.body.price,
    ProdQty: req.body.qty,
    ProdImage: req.body.img,
  };

  let sql =
    "INSERT INTO ContractProduct (ProdName, ProdPrice, ProdQty, ProdImage) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [detail.ProdName, detail.ProdPrice, detail.ProdQty, detail.ProdImage],
    function (err) {
      if (err) {
        console.error("Error executing SQL query:", err);
        res
          .status(500)
          .send({ status: false, error: "Cannot add product details" });
      } else {
        res.send({ status: true, message: "Added" });
      }
    }
  );
});

// Get All data from Product table
server.get("/products/all", (req, res) => {
  var sql = "SELECT * FROM ContractProduct";
  db.query(sql, function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.json({ status: true, result });
    }
  });
});

// Get data by Category in Product table
server.get("/products/:category", (req, res) => {
  var sql = "SELECT * FROM ContractProduct WHERE ProdCategory = ?";
  var cat = req.params.category;
  db.query(sql, [cat], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.json({status: true, result});
    }
  });
});

server.get("/products/search/:name", (req, res) => {
  
  var prodName = req.params.name;
  var sql = "SELECT * FROM ContractProduct WHERE SUBSTRING(ProdName,1,"+prodName.length+") = ?";
  db.query(sql, [prodName], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.json({status: true, result});
    }
  });
});

// _______________________
// TRANSACTIONS
// Add Transactions
server.post("/transactions/add/", (req, res) => {
  let detail = {
    UserID: req.body.UserID,
    ProdID: req.body.ProdID,
    ProdName: req.body.ProdName,
    TransAmount: req.body.TransAmount,
    ProdPrice: req.body.ProdPrice,
    TransDate: req.body.TransDate,
    Trans_Status: req.body.Trans_Status,
    TransMethod: req.body.TransMethod
  };

  let sql =
    "INSERT INTO ContractTransaction (UserID, ProdID,ProdName,TransAmount,ProdPrice,TransDate,Trans_Status,TransMethod) VALUES (?, ?, ?, ?, ?,?,?,?)";
  db.query(
    sql,
    [
      detail.UserID,
      detail.ProdID,
      detail.ProdName,
      detail.TransAmount,
      detail.ProdPrice,
      detail.TransDate,
      detail.Trans_Status,
      detail.TransMethod
    ],
    function (err) {
      //for testing the details, can be removed later
      console.log("Received request body:", req.body);
      if (err) {
        console.error("Error executing SQL query:", err);
        res
          .status(500)
          .send({ status: false, error: "Cannot add user details" });
      } else {
        res.send({ status: true, message: "Added" });
      }
    }
  );
});

server.get("/transactions/:id", (req,res) => {
  var userID = req.params.id;
  var sql = "SELECT * FROM ContractTransaction WHERE UserID = ?";
  db.query(sql, [userID], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send({ status: false, error: "Cannot connect to Database" });
    } else {
      res.json({status: true, result});
    }
  });
}) 

