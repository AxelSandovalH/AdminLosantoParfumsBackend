const express = require('express')
const bodyParser = require('body-parser')
const bycrypt = require('bcrypt')
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/adduser", async (req, res) => {
    const sql = "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)"

    const hashedPassword = await bycrypt.hash(req.body.password, 10)

    const values = [req.body.name, req.body.email, req.body.username, hashedPassword]

    db.query(sql, values, (err, result) => {
        if(err) 
            return res.json({ message: "Something unexpected has occured" + err})
        return res.json({ success: "New User added successfully"})
    })
})

app.listen(3001, () => {console.log(`Server started on port 3001`)})