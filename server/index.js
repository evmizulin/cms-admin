const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const indexHtml = fs.readFileSync('./build/index.html', 'utf8')
const { config } = require('../config')

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: path.join(__dirname, '../logs'),
})
const format =
  ':date[iso] :remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms'

const app = express()

app.use(morgan(format, { stream: accessLogStream }))
app.use(express.static('build'))

app.get('*', (req, res) => {
  res.status(200).send(indexHtml)
})

app.listen(config.prodAppServerPort, config.prodAppServerHost, () => {
  // eslint-disable-next-line no-console
  console.log(
    `${new Date().toISOString()} listening on ${config.prodAppServerHost}:${config.prodAppServerPort}`
  )
  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} NODE_ENV=${process.env.NODE_ENV}`)
})
