const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./variables.env" });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", function(error) {
  console.log("Error de mongoose: ", error);
});

require("./schemas/persona");
const modeloPersona = mongoose.model("Persona");

const app = express();

app.use(bodyParser());

app.get("/", function(req, res) {
  res.send("Hola!");
  res.status(200);
});

app.get("/2", function(req, res) {
  res.send("Hola #2!");
});

app.get("/new", function(req, res) {
  const miPersona = new modeloPersona({
    name: req.query.name,
    username: req.query.username,
    email: req.query.email,
    password: req.query.password,
    age: req.query.age
  });
  miPersona.save().then(function() {
    res.send("Persona Guardada.");
  });
});

app.get("/personas", function(req, res) {
  console.log(req.query.name);
  const search = {
    name: req.query.name
  };
  modeloPersona.find(search).then(function(users) {
    res.send(users);
  });
});

app.listen(2400, function() {
  console.log("Aplicacion escuchando en puerto 2400");
});
