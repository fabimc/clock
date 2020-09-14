const app = require('./index.js').app
const Router = require('koa-router')

const router = new Router()

const clock = require('./controllers/clock.js')
const main = require('./controllers/main.js')

router.get('/', main.index)
router.get('/iclock/cdata', clock.configuration)
router.post('/iclock/cdata', clock.configuration)

app.use(router.routes())
app.use(router.allowedMethods())
