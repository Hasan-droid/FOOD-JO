// 'use strict';

// const client = require('socket.io-client');
// const host = "http://localhost:8000/caps";
// const socket = client.connect(host);
// const faker = require("faker");




// const value = process.argv.splice(2)[0];
// console.log("value : ", value);


// setInterval(() => {
 
 
//   socket.emit('new_Order', value);
//   socket.emit('pickUp', value);
//   }, 5000);

// socket.on('added',payload=>{
//   console.log('thank you for adding to queue ', payload.orderID)
// }) 
// socket.on('deliveredV',delivered)
// function delivered(payload){
   
//     console.log('thank you for delevering ', payload)
// }



'use strict';

const client = require('socket.io-client');
const host = "http://localhost:3000/family";
const socket = client.connect(host);
const form=document.getElementById('form')


form.addEventListener('sumbit',handler)

function handler(e){
    e.preventDefault()
let order=e.target.order.value
socket.emit('new_chore', order);
console.log("value : ", order);
}


// take the task value from argument form the terminal
// console.log(process.argv)
// const value = process.argv.splice(2)[0];





// socket.emit('new_chore', "wash the dishes");


socket.on('added', payload=> {
    console.log("Thank you for adding : ", payload , " to the queue");
    socket.disconnect();
});