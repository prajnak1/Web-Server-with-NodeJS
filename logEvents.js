const { format } = require('data-fns');
const { v4: uuid} = require('uuid');


const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message,logName) =>{
    const dateTime = `${(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs',logName), logItem);
    }catch(err){
        console.log(err);
    }
}

module.exports = logEvents;