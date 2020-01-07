const helpers =  {}
//const {format} = require('timeago.js')
const moment =  require('moment')

helpers.timeago = (timestamp)=>{
  return moment(timestamp).startOf('minute').fromNow()
  //return format(timestamp)
}

module.exports = helpers;