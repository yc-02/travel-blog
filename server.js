const http = require('http');
const fs = require ('fs');

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);
    res.setHeader('content-Type','text/html')
    fs.readFile('./views/index.html',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data);
        }
    })

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000')
})

