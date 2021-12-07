const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(
    cors({
        origin: "http://127.0.0.1:5500"
    })
)

const db = new Database('./backend/users.db');

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

app.get("/", (req, res) => {
    let preparedStatement = db.prepare("SELECT * FROM users");

    let result = preparedStatement.all();
    res.send(result);
});

app.get("/:id", (req, res) => {
    let preparedStatement = db.prepare("SELECT * FROM users WHERE userID = ?");

    let user = preparedStatement.get(req.params.id);

    res.send(user);
})

app.post("/", (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    const insert = db.prepare("INSERT INTO users (firstname, lastname) VALUES(?,?)");
    insert.run(firstname, lastname);

    return res.send("Data inserted!");
})
