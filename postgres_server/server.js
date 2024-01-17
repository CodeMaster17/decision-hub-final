const PORT = 3003
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const pool = require('./database/database.connection')

app.get('/userdata', async (req, res) => {

    try {
        const todos = await pool.query('SELECT * from userdata')
        console.log(res.json(todos.rows))

    } catch (error) {
        console.log("Fetching user error", error)
    }
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})