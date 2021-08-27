'use strict'

const socket = io('ws://localhost:8080/food');

// const id = Math.floor(Math.random() * 2515412154202)

socket.on('message', text => {

    console.log(text)
    const el = document.createElement('li');
    const el1 = document.createElement('li');
    const el2 = document.createElement('li');
    const el3 = document.createElement('li');
    
    el.innerHTML = `  Your Order :${text.text  }     With Name:${text.text1  }   Phone: ${text.text2  } Location: ${text.text3  } and send it to the Restaurant `

    setTimeout(() => {
        el1.innerHTML='Your Order On Progress' 
    },3000);
    
    document.querySelector('ul').appendChild(el)
    document.querySelector('ul').appendChild(el1)
    document.querySelector('ul').appendChild(el2)
    document.querySelector('ul').appendChild(el3)

    socket.on('trinzet',payload=>{
        el2.innerHTML='Your Order On The Way  '
    })

    socket.on('deliveredV',delivered)
  function delivered(payload){
    el3.innerHTML='Thank You For Ordering From FOOD JO '
      
  }

});

document.getElementById('but0').onclick = () => {

    const text  = document.getElementById('i').value;
    const text1 = document.getElementById('n').value;
    const text2 = document.getElementById('p').value;
    const text3 = document.getElementById('u').value;
    const text4 = document.getElementById('t').value;
   
const obj ={
    text:text,
    text1:text1,
    text2:text2,
    text3:text3,
    text4:text4,
   
}
    socket.emit('message', obj)
    alert('Your Order Have Been Reserved')
}
