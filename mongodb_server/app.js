

require("dotenv").config()
const express = require("express")
const app = express()
require("./database/connection")
const cors = require('cors')
const ruleController = require('./controllers/rule_controller'); // Update the path according to your project structure

// const router = require("./routes/route")

const PORT = process.env.PORT || 5002

app.use(cors())

app.use(express.json())
app.get('/', async (req, res) => {
    return res.send({ "status": "status ok" })
})

app.post('/create-rule', ruleController.rulepost);
app.get('/rules', ruleController.getAllRules);
app.get('/rules/:id', ruleController.getRuleById);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

