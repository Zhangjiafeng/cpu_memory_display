const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const common=require('./libs/common.js');
const osUtils=require('os-utils')
const os=require('os')
const fs=require('fs')
var server=express();
server.listen(8005);

//获取请求数据
server.use(bodyParser.urlencoded({extended:false}));

server.get('/',(req,res)=>{
    common.loadHtml('index',res);
})
server.use('/getcpu',(req,res)=>{
    var per=os.freemem()/os.totalmem();
    var data={}
    data.memory=per;
    data.cpus=os.cpus();
    data.freemem=os.freemem();
    data.totalmem=os.totalmem();
    data.ran=Math.random().toFixed(2);

    osUtils.cpuUsage(function(cpu){
        data.cpu=cpu;
        let str=(cpu*100).toFixed(1).toString()+"%   "+(100-(data.memory * 100)).toFixed(1).toString()+"%   "+data.ran.toString()+'\n';
        fs.writeFile('./static/log.txt',str,{'flag':'a'},function(err){
            if(err){
                throw err;
            }
            res.send(data)
        })

    })
})

server.use(static('./static'));
console.log('server running at port 8080.')
