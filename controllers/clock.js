fs = require('fs')

module.exports.configuration = async ctx => {
  const { SN, options, pushver, language, pushcommkey } = ctx.request.query
  await ctx.render('commands', {
    serialNumber: SN,
    options,
    pushver,
    language,
    pushcommkey
  })
}

module.exports.operations = async ctx => {
  const { SN } = ctx.request.query
  const body = ctx.request.body

  fs.writeFile(
    `./execution_logs/execution${Date.now()}.log`,
    JSON.stringify(body, null, 4),
    function (err) {
      if (err) return console.log(err)
      console.log('execution logged in')
    }
  )

  await ctx.render('executions', {
    serialNumber: SN,
    body
  })
}
