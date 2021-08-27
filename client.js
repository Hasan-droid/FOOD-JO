'use strict'

const socket = io('ws://localhost:8080/food');

// const id = Math.floor(Math.random() * 2515412154202)
const card1=document.getElementById("card1");

const card2=document.getElementById("card2");
const card3=document.getElementById("card3");
const card4=document.getElementById("card4");
card1.style.visibility='hidden';
card2.style.visibility='hidden';
card3.style.visibility='hidden';
card4.style.visibility='hidden';

socket.on('message', text => {
   let p=card1.childNodes[1].childNodes;
    console.log(p[5].innerHTML=`order : ${text.text  } <br> to: ${text.text1  }  <br> Location: ${text.text3  } <br>  Phone: ${text.text2  }  `);
    p[5].style.color="darkkhaki"
    console.log(text)
  
    card1.style.visibility="visible"
    
  

    setTimeout(() => {
        card2.style.visibility="visible"
        let p2=card2.childNodes[1].childNodes[3];
        console.log(p2.innerHTML="resturant preparing your order now");
        p2.style.color="darkkhaki"
       
    },3000);
    


    socket.on('trinzet',payload=>{
        card3.style.visibility="visible"
        let p3=card3.childNodes[1].childNodes[3];
        console.log(p3.innerHTML="Your Order On The Way");
        p3.style.color="darkkhaki"
      
    })

    socket.on('deliveredV',delivered)
  function delivered(payload){
    card4.style.visibility="visible"
    let p4=card4.childNodes[1].childNodes[3];
    console.log(p4.innerHTML="Thank You For Ordering From FOOD JO");
    p4.style.color="darkkhaki"
   
      
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
