const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());

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

// View data in User Table
server.get("/users/all", (req, res) => {
  var sql = "SELECT * FROM ContractUser";
  db.query(sql, function (err, result) {
    if (err) {
      console.log("Cannot connect to Database");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Search Email in User Table
server.get("/users/getEmail/:email", (req, res) => {
  var userEmail = req.params.email;
  var sql = "SELECT * FROM ContractUser WHERE UserEmail =" + userEmail;
  db.query(sql, function (err, result) {
    if (err) {
      console.log("Cannot connect to Database");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.post("/users/signUp", (req, res) => {
  let detail = {
    UserEmail: req.body.email,
    // pwd: req.body.password,
    FirstName: req.body.fName,
    LastName: req.body.lName,
    UserName: req.body.userName,
  };

  let sql = "INSERT INTO ContractUser SET ?";
  db.query(sql, detail, function (err) {
    if (err) {
      res.send({ status: false, message: "Cannot add user" });
    } else {
      res.send({ status: true, message: "Added" });
    }
  });
});


server.post("/products/add", (req, res) => {
  let detail = {
    ProdName: req.body.name,
    // pwd: req.body.password,
    ProdPrice: req.body.price,
    ProdQty: req.body.qty,
    ProdImage: req.body.img,
  };

  let sql = "INSERT INTO ContractProduct SET ?";
  db.query(sql, detail, function (err) {
    if (err) {
      res.send({ status: false, message: "Cannot add product" });
      throw err;
    } else {
      res.send({ status: true, message: "Added" });
    }
  });
});

// server.get("/users/getEmail/:email", (req, res) => {
//   // console.log("Get Products by SubCategoryID");
//   let userEmail = req.params.email;

//   async.series([
//       (callback) => {
//         db.query(sql, function (err,result) {
//           if (err) {
//             return callback(err);
//           }
//           if (!result) {
//             return callback(Error());
//           }
//           users = result;
//         })
//       }
//   ],
//       (err, result) => {
//           if (err) {
//               console.log(err);
//               return res.json({ result: false, error: err.message });
//           }
//           res.json({ result: true, users });
//       }
//   )
// })
