const express= require('express'),
      app= express(),
      path = require('path'),
      server=require('http').Server(app),
      oi=require('socket.io')(server),
      port=3000;
      const bodyParser = require ('body-parser');

//archivos staticos      
app.use(express.static('client'));

app.use (bodyParser.urlencoded ({extended: false}));
//Levantar servidor
app.get('/hola',function(req,res){
    res.status(200).send('hola');
   // console.log(res.status(200));
});
let mensajes=[{
    id:1,
    text:'Hola bienvenido aca',
    Nick:'Bot'
}
];
oi.on('connection',function (socket) {
  console.log('hola de desde'+ socket.handshake.address);
  socket.emit('mensajes',mensajes);  
  socket.on('addMsj',function (data) {
      mensajes.push(data);
      oi.sockets.emit('mensajes',mensajes);
  })  
});

server.listen(port,()=>{
    console.log(`Servidor funcionando en el puerto ${port}`);
   
});