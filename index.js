const Koa = require('koa')
const hbs = require('koa-hbs')
const bodyParser = require("koa-bodyparser");
const app = new Koa()

exports.app = app

// trust proxy
app.proxy = true

// misc handlebars helpers
require('./helpers/handlebars')

app.use(bodyParser());

// load up the handlebars middlewear
app.use(
  hbs.middleware({
    viewPath: `${__dirname}/views`,
    layoutsPath: `${__dirname}/views/layouts`,
    partialsPath: `${__dirname}/views/partials`
  })
)

require('./routes')

app.listen(process.env.PORT || 3000)
console.log(`Clock server is now online`)
