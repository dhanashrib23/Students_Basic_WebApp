const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

var connectionDetails = {
  host: "localhost",
  user: "W2_87323_Dhanashri",
  password: "manager",
  port: 3306,
  database: "classwork",
};

app.use(express.json());
app.use(cors());

app.get("/student", (request, response) => {
  const connection = mysql.createConnection(connectionDetails);
  connection.connect();
  let queryText = `select * from student`;

  connection.query(queryText, (error, result) => {
    response.setHeader("content-type", "application/json");
    if (error == null) {
      let dataInJSON = JSON.stringify(result);
      response.write(dataInJSON);
    } else {
      response.write(error);
    }
    response.end();
    connection.end();
  });
});

app.get("/student/:id", (request, response) => {
  let no = request.params.id;

  const connection = mysql.createConnection(connectionDetails);
  connection.connect();

  let queryText = `select * from student where id = ${no}`;

  connection.query(queryText, (err, result) => {
    response.setHeader("content-type", "application/json");
    if (err == null) {
      let dataInJSON = JSON.stringify(result);
      response.write(dataInJSON);
    } else {
      response.write(err);
    }
    response.end();
    connection.end();
  });
});

app.post("/student", (request, response) => {
  console.log("Data Received from request body is : ");
  console.log(request.body); // req.body is a body in which inputed data from server in comming in stream format(Chunks).

  const connection = mysql.createConnection(connectionDetails);
  connection.connect();

  let queryText = `insert into student(name,address) values('${request.body.name}','${request.body.address}') `;
  connection.query(queryText, (error, result) => {
    response.setHeader("content-type", "application/json");
    if (error == null) {
      let dataInJSON = JSON.stringify(result);
      response.write(dataInJSON);
    } else {
      response.write(error);
    }
    response.end();
    connection.end();
  });
});

app.put("/student/:id", (request, response) => {
  var id = request.params.id; // id from header

  const connection = mysql.createConnection(connectionDetails);
  connection.connect();

  let queryText = `update student set name = '${request.body.name}', address = '${request.body.address}' where id=${id}`;

  connection.query(queryText, (error, result) => {
    response.setHeader("content-type", "application/json");
    if (error == null) {
      let dataInJSON = JSON.stringify(result);
      response.write(dataInJSON);
    } else {
      console.log(error);
      response.write(error);
    }
    response.end();
    connection.end();
  });
});

app.delete("/student/:id", (request, response) => {
  var id = request.params.id; // id from header

  const connection = mysql.createConnection(connectionDetails);
  connection.connect();

  let queryText = `delete from student where id=${id}`;

  connection.query(queryText, (error, result) => {
    response.setHeader("content-type", "application/json");
    if (error == null) {
      let dataInJSON = JSON.stringify(result);
      response.write(dataInJSON);
    } else {
      console.log(error);
      response.write(error);
    }
    response.end();
    connection.end();
  });
});

app.listen(9898, () => {
  console.log(`server listening at port number 9898 .....`);
});
