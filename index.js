const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

app.use(express.json());

const db = new Database('./backend/users.db');

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

app.get("/", (req, res) => {
    let preparedStatement = db.prepare("SELECT * FROM users");

    let result = preparedStatement.all();
    res.send(result);
});

app.post("/", (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    const insert = db.prepare("INSERT INTO users (firstname, lastname) VALUES(?,?)");
    insert.run(firstname, lastname);
})



