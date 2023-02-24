require ('dotenv').config();

const express = require('express');

require('express-async-errors');

const app = express();

const db =require('./models');
db.sequelize.authenticate()
    .then(()=>console.log(`Connection db successful`))
    .catch((err)=> console.log('Connection db failed',err))

if(process.env.NODE_ENV==='development'){
    //db.sequelize.sync({force:true});
    //db.sequelize.sync({alter:{drop:false}})
}

//Middleware app-lvl
app.use(express.json());

//Router
const router = require('./routes');
app.use('/api',router);

//Lancement serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Server API started on port ${process.env.PORT}`);
})