'use strict';


const socket = io('ws://localhost:8080/food');

// pulling msgs 
socket.emit('get_all');

socket.on('order', payload=> {

  document.querySelector('button').onclick = () => {
    console.log("I Got The Order and i will Delivered it : ", payload)
  
    const el = document.createElement('li');
    const el1 = document.createElement('li');
    const el2 = document.createElement('li');

    setTimeout(() => {
        el.innerHTML=`I Got The Order and i will Delivered it : , ${payload.payload.text}` 
    },5000);
    
    document.querySelector('ul').appendChild(el)
    document.querySelector('ul').appendChild(el1)
    document.querySelector('ul').appendChild(el2)
  
        socket.emit('received', payload)
   
    
  
    setTimeout(() => {
    //   console.log("Driver: picked up ");
    
    el1.innerHTML="Your Order On The Way  "
      socket.emit("in-transit", payload);
      

    }, 8000);


    setTimeout(() => {
    //   console.log("Driver: delivered", payload);
    el2.innerHTML='The Order Was Delivered'
      socket.emit("delivered", payload);
    }, 12000);
  
  }
  })
