const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3001

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRouter = require('./routes/userRoutes')
const profilRouter = require('./routes/profilRoutes')

app.use('/api/users', userRouter)
app.use('/api/profils', profilRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})