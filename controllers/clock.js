module.exports.configuration = async ctx => {
  const { SN, options, pushver, language, pushcommkey } = ctx.request.query  
  await ctx.render('configuration', {
    serialNumber: SN,
    options,
    pushver,
    language,
    pushcommkey
  })
}

module.exports.operations = async ctx => {
  const { SN, options, pushver, language, pushcommkey } = ctx.request.query  
  const body = ctx.request.body
  console.log('Payload', JSON.stringify(body, null, 4))
  await ctx.render('configuration', {
    serialNumber: SN,
    options,
    pushver,
    language,
    pushcommkey
  })
}
