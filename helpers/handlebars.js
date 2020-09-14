const hbs = require('koa-hbs')

const if_eq = (a, b, opts) => {
  if (a == b) {
    return opts.fn(this)
  }
  return opts.inverse(this)
}

hbs.registerHelper('if_eq', if_eq)

hbs.registerHelper('copyright_year', opts => new Date().getFullYear())

hbs.registerHelper('get_name', opts => 'clock')
