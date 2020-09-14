module.exports.index = async ctx => {
  console.log('@@papa')
  await ctx.render('index')
}