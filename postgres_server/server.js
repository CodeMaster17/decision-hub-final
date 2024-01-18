const PORT = 3003
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./database/database.connection')
app.use(cors())

app.get('/userdata', async (req, res) => {

    try {
        const todos = await pool.query('SELECT * from userdata;')
        // console.log(res.json(todos.rows))
        return res.json(todos.rows)

    } catch (error) {
        console.log("Fetching user error", error)
    }
})
app.get('/userdata/:sql', async (req, res) => {

    console.log("PARAMS", req.params)

    try {
        const todos = await pool.query(req.params.sql)
        console.log(res.json(todos.rows))
        return res.json(todos.rows)

    } catch (error) {
        console.log("Fetching user error", error)
    }
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})