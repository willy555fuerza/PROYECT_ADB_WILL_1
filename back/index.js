/*****************conection 4 servidor*********************/

const express = require ('express')
const server = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
/*login-logout*/
const router_login_logout = require('./src/routes/login_routes')
/*login-logout...*/
const routerusuario = require('./src/routes/usuario_routes')
const routerministerio = require('./src/routes/ministerio_routes') 
const routermiembro = require('./src/routes/miembro_router')  
/* const routerproveedor = require('./src/routes/proveedor_router') */



const PORT = process.env.PORT || 3000 

server.use((req,res , next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials",true)
    next()
})

server.get ('/', (req, res) => {
    res.send('Api Proyect')
})

server.use(bodyParser.json());
server.use('/ADB', router_login_logout )
server.use('/ADB', routerusuario )
server.use('/ADB', routerministerio )
server.use('/ADB', routermiembro )  


server.listen(PORT,() =>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})
