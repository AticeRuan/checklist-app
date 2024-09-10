require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./utils/swaggerConfig')
const swaggerUi = require('swagger-ui-express')
const serverless = require('serverless-http')

var corsOptions = {
  origin: ['http://localhost:5173', 'https://checklist-app-gray.vercel.app'],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Forwarded-For',
    'X-Real-IP',
  ],
  exposedHeaders: ['Authorization', 'X-Forwarded-For', 'X-Real-IP'],
}

//middlerware
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://checklist-app-gray.vercel.app'],

    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Forwarded-For',
      'X-Real-IP',
    ],
    exposedHeaders: ['Authorization', 'X-Forwarded-For', 'X-Real-IP'],
  }),
)

// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Origin',
//     'https://checklist-app-gray.vercel.app',
//   )
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   )
//   next()
// })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//routes

//Category
const categoryRouter = require('./routes/categoryRouter')
app.use('/api/categories', categoryRouter)

//Site
const siteRouter = require('./routes/siteRouter')
app.use('/api/sites', siteRouter)

//Comment

const commentRouter = require('./routes/commentRouter')
app.use('/api/add-comment', commentRouter)

//Checklist
const checklistRouter = require('./routes/checklistRouter')
app.use('/api/checklists', checklistRouter)

//Template
const templateRouter = require('./routes/templateRouter')
app.use('/api/templates', templateRouter)

//listitem
const listItemRouter = require('./routes/listitemRouter')
app.use('/api/list-items', listItemRouter)

//UserCheck
const userCheckRouter = require('./routes/userCheckRouter')
app.use('/api/user-checks', userCheckRouter)

//User
const userRouter = require('./routes/userRouter')
app.use('/api/users', userRouter)

//ip address

const ipAddressRouter = require('./routes/ipAddressRouter')
app.use('/api/ip-addresses', ipAddressRouter)

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

//port

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.json({ message: 'Hello from ListSync!' })
})

//server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
module.exports.handler = serverless(app)
