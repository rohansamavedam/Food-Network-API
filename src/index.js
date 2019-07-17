const express = require('express')
const cors = require('cors')
require('./db/mongoose')//This line ensures that the file runs and connects to the database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' +port)
})



