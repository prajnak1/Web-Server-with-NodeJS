const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
//don't need curly braces if it's one function
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3502;


// custom middleware logger
app.use(logger);
//cross origin resource sharing
//127.0.0.1:5500 is the same as having localhost
//yoursite is the domain of front end project
const whitelist = ['https://www.yoursite.com','http://127.0.0.1:5500/','http://localhost:3502']
const corsOptions = {
    origin:(origin,callback) => {
        if(whitelistlist.indexOf(origin)!==-1){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus:200
}
app.use(cors());
// built-in middleware to handle url encoded data
//in other words, form data
app.use(express.urlencoded({extended: false}));

//built in middleware for json
app.use(express.json());

//serve static files
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


//routes
app.use('/',require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
app.use('/employees',require('./routes/api/employees'));




app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:"404 Not Found"});
    }else{
        res.type('txt').send("404 Not Found");
    }
})


//has an error parameter
//send message to be sent to the browser
app.use(errorHandler);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))






    