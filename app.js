const express = require('express')
const morgan = require('morgan')
const cors = require("cors");
// const cookieParser = require('cookie-parser')
const app = express()
const port = 3001

app.use(express.json())
app.use(morgan('dev'))
// app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRouter = require('./routes/userRoutes')
const profilRouter = require('./routes/profilRoutes')
const reviewRouter = require ('./routes/reviewRoutes')

app.use('/api/users', userRouter)
app.use('/api/profils', profilRouter)
app.use('/api/reviews', reviewRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})