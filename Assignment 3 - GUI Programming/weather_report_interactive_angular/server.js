const express = require('express')

const app = express()
app.use(express.static('static'))

app.listen(9090, () => console.log("Server is listening on 9090"))
