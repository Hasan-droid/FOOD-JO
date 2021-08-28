'use strict';


const socket = io('ws://localhost:8080/food');

// pulling msgs 
socket.emit('get_all');

socket.on('order', payload=> {

  document.querySelector('button').onclick = () => {


    let dev=document.querySelector('.card__container')
    dev.innerHTML=''
  
    

    setTimeout(() => {
      dev.innerHTML+=`
      
      <div class="card">
       <div class="card__content">
        
        <h3 class="card__header">Got The Order</h3>
    <p class="card__info">
    I Got The Order and i will Delivered it :${payload.payload.text}</br>
    for : ${payload.payload.text1}
    </p>
                                             
          </div>
   </div>` 
    },5000);
    
   
  
        socket.emit('received', payload)
   
    
  
    setTimeout(() => {
    //   console.log("Driver: picked up ");
    
    dev.innerHTML+=`   
    <div class="card">
       <div class="card__content">
       
        <h3 class="card__header">Order On The Way</h3>
    <p class="card__info">
      im in my way to ${payload.payload.text2}
    </p>
                                             
          </div>
   </div>
    `
      socket.emit("in-transit", payload);
      

    }, 8000);


    setTimeout(() => {
    //   console.log("Driver: delivered", payload);
    dev.innerHTML+=`
    <div class="card">
       <div class="card__content">
       
        <h3 class="card__header">The Order Was Delivered</h3>
    <p class="card__info">
      i deleverd the order :${payload.payload.text}
    </p>
                                             
          </div>
   </div>
    `
      socket.emit("delivered", payload);
    }, 12000);
  
  }
  })
