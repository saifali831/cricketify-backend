const express = require('express');
const dbConfig = require('./app/config/db.config')
const db = require('./app/models');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authJwt = require('./app/config/auth.config');
const bodyParser = require('body-parser');
const app = express();
const expSession = require('express-session');
const path = require('path');
const {signupHelpers} = require('./app/middlewares')
// mongodb connection
//`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
//mongodb+srv://saifZafar:User0007@cluster0.3nkrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
db.mongoose.connect(`mongodb+srv://saifZafar:User0007@cluster0.3nkrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`successfuly connected to ${dbConfig.DB}`)
}).catch((err)=>{
    console.log(`Connection error : ${err}`)
    process.exit()
})


// cors setup
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



// session setup
app.use(expSession({
    name:'saif-session',
    secret:`my-secret-session`,
    resave:true,
    saveUninitialized:true,
    cookie:{}
}))


// routes

app.get('/',(req,res)=>{
    res.status(200).send({message:"welcome to cricketify"})
})
require('./app/routes/common.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/post.route')(app);
require('./app/routes/public.route')(app);


let clientsList =[]

// server setup
const PORT= process.env.PORT || 8080
const server= app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

const io = require('socket.io')(server,{
    cors:{
        origin: "*"
    }
});

io.on('connection',socket=>{
    console.log(`client connected with socketId: ${socket.id}`)
    socket.on('setOnlineUser',name=>{
        const tempObject = {name:name,socketId:socket.id}
        clientsList.push(tempObject)
        console.log(clientsList.length)
    })

    socket.emit("getActiveUsers",clientsList);

    socket.on("chat:client",chat=>{
        console.log(chat.message);
        socket.broadcast.emit("chat:server",{user:chat.user,message:chat.message})
    })
    socket.on('disconnect',()=>{
        for(var i = 0; i < clientsList.length; i++) {
            if(clientsList[i].socketId == socket.id) {
                clientsList.splice(i, 1);
                break;
            }
        }
        console.log(clientsList.length);
        console.log(`client gone [id:${socket.id}]`)
    })
 
})