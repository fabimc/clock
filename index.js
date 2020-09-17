const Koa = require('koa')
const hbs = require('koa-hbs')
const bodyParser = require('koa-bodyparser')
const winston = require('winston')
const { logger } = require('koa2-winston')
const PORT = process.env.PORT || 3000

const app = new Koa()

exports.app = app

// trust proxy
app.proxy = true

// misc handlebars helpers
require('./helpers/handlebars')

app.use(bodyParser({ enableTypes: ['text'] }))

const winstonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.prettyPrint()
)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  //winston.format.align(),
  winston.format.printf(
    info =>
      `[${info.timestamp}] ${info.level}: ${info.message} ${
        info.res.status
      } ${JSON.stringify(info.req.body, null, 4)}`
  )
)
app.use(
  logger({
    reqSelect: ['body'],
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: winstonFormat,
      }),
      new winston.transports.File({
        filename: './request_logs/request.log',
        format: winstonFormat,
        maxsize: 500
      }),
      new winston.transports.Console({
        level: 'info',
        format: consoleFormat
      })
    ]
  })
)

app.use(logger())

// load up the handlebars middlewear
app.use(
  hbs.middleware({
    viewPath: `${__dirname}/views`,
    layoutsPath: `${__dirname}/views/layouts`,
    partialsPath: `${__dirname}/views/partials`
  })
)

require('./routes')

app.listen(PORT)
console.log(`Clock server is now listening on port ${PORT}`)
