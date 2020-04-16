const socket= io.connect('http://192.168.1.2:3000',{forceNew:true}),
storyBoard=document.getElementById('mensajes');

socket.on('mensajes',function (data) {
    let html='';
    data.map((mensaje,i)=>{
        
        let {id,text,Nick}=mensaje;
        html+=`<div id="${id}" class="  col-12  card text-white bg-primary mb-3" style="margin-bottom:20px;">
        <div class="card-header">Mensaje de ${Nick} </div>
        <div class="card-body">
          <h4 class="card-title">Mensaje:</h4>
          <p class="card-text">${text}</p>
        </div>
      </div>`;
        console.log(id);
        
    });
    storyBoard.innerHTML=html;
});
document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let nickEmiter=document.querySelector('#nickemiter'),
        msj=document.querySelector('#messaje-emit'),
         emitMessaje={
        id:storyBoard.children.length+1,
        Nick:nickEmiter.value,
        text:msj.value
    };
    nickEmiter.style.display="none";
    socket.emit('addMsj',emitMessaje);
    document.getElementById('numberjs').innerText=storyBoard.children.length+1;


});