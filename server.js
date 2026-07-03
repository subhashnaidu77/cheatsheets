const http = require('node:http');
const server = http.createServer((request,response)=>{
   if(request.url==='/login'&& request.method==='POST'){
    let data = ""

    request.on('data',(chunk)=>{
        data +=chunk;
    })

    request.on('end',()=>{
        try {
            const user = JSON.parse(data);

            if(user.username==='student' && user.password==='1234'){
                const token = 'SECRET_TOKEN'+ Math.random();
                response.writeHead(200,{'Content-Type':'application/json'});
                response.end(JSON.stringify({message:'login done',token:token}));
            }
            else{
                response.writeHead(401,{'Content-Type':'application/json'});
                response.end(JSON.stringify({message:'invalid credentials'}));
            }
        } catch (error) {
            response.writeHead(400,{'Content-Type':'application/json'});
            response.end(JSON.stringify({message:'bad JSON data'}));
        }
    })
   } else {
       response.writeHead(404, {'Content-Type': 'application/json'});
       response.end(JSON.stringify({message: 'not found'}));
   }
})
server.listen(3000,()=>{
    console.log("server is running on port 3000");
})
