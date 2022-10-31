const  express = require('express')
const app = express();
const cors =require("cors");
require('dotenv').config();
const connection = require ('./config/db');

const userController = require('./routes/user.routes');
const noteController = require('./routes/notes.routes');
const authentication = require('./middlewares/authentication');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/',userController);

app.use(authentication);

app.use('/',noteController);
app.listen(process.env.PORT,async () => {
   try{
    await connection;
    console.log('connected to db');
   }
   catch(err){
    console.log('err');
   }
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
