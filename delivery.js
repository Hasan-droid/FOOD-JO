'use strict';

const socket = io('ws://localhost:8080/food');

// pulling msgs 
socket.emit('get_all');



socket.on('order', payload=> {

  document.querySelector('button').onclick = () => {
    console.log("i got the order and i will deleverd it : ", payload)
    
  
   
    const el = document.createElement('li');
    const el1 = document.createElement('li');
    const el2 = document.createElement('li');
    // el.innerHTML = `i got the order and i will deleverd it : , ${payload.payload.text}`

    setTimeout(() => {
        el.innerHTML=`i got the order and i will deleverd it : , ${payload.payload.text}` 
    },5000);
    
    document.querySelector('ul').appendChild(el)
    document.querySelector('ul').appendChild(el1)
    document.querySelector('ul').appendChild(el2)
  
        socket.emit('received', payload)
   
    
  
    setTimeout(() => {
    //   console.log("Driver: picked up ");
    
    el1.innerHTML="im on the way to delever the oreder  "
      socket.emit("in-transit", payload);
      

    }, 8000);


    setTimeout(() => {
    //   console.log("Driver: delivered", payload);
    el2.innerHTML='the order was deleverd'
      socket.emit("delivered", payload);
    }, 12000);
  
  }
  })
