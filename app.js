const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())


//routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

//mongo connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)    
    app.listen(port, console.log(`server started on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}

start()