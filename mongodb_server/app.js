require("dotenv").config()
const express = require("express")
const app = express()
require("./database/connection")
const cors = require('cors')
// const router = require("./routes/route")

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.get('/', async (req, res) => {
    return res.send({ "status": "status ok" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})