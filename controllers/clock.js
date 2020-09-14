module.exports.configuration = async ctx => {
  const{ SN, options, pushver, language, pushcommkey } = ctx.request.query
  await ctx.render('configuration', {
    serialNumber: SN,
    options,
    pushver,
    language,
    pushcommkey
  })
}
