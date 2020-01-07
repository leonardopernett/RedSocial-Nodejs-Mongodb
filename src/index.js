const app = require('./config.js')

function main(){
     app.listen(app.get('port'),()=>{
         console.log('server on port ', app.get('port'))
     })
     require('./database.js')
}

main()