const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())


const formRouter = require('./routes/form.router')

app.use("/api/v1/form", formRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))