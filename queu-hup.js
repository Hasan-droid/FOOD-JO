// 'use strict'


// const port=process.env.PORT||8000
// const io =require('socket.io')(port)
// const uuid = require('uuid').v4;
// const msgQueue = {
//   orders : {}
// }

// const caps=io.of('/caps')

// caps.on('connection',socket=>{

//   console.log("CONNECTED Sucsses", socket.id)

//   socket.on("pickUp", pickup);


//   function pickup(payload) {


//     console.log("adding a new order....", payload.orderID)
//     const id = uuid();
//     console.log("id ====> ", id)
//     msgQueue.orders[id]=payload
//     socket.emit('added', payload);
//     caps.emit('order', {id: id, payload: msgQueue.orders.id}); 
//     console.log("after add msgQueue ========> ", msgQueue.orders)
//     let order = {
//       event: "pickup",
//       time: new Date(),
//       payload,
//     };
//     console.log("Event", order);
    
//   }

// socket.on('get_all', ()=> {
//   console.log("get_all : driver wants to get has orders   ")
//   Object.keys(msgQueue.orders).forEach(id=> {
//       socket.emit('order',  {id: id, payload: msgQueue.orders.id })
//   });
// });


// socket.on('received', msg => {
//   console.log("received on queue will remove it ...")
//   // he child confirmed receiving , remove from queue
//   delete msgQueue.orders[msg.id];
//   console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue.orders)
//   // caps.emit('pickedUp',msg)
// })
 
//   // in-transit
//   socket.on("in-transit", inTransit);
//   function inTransit(payload) {
//     let order = {
//       event: "in-transit",
//       time: new Date(),
//       payload,
//     };
//     console.log("Event", order);
//   }

//   // delivered
//   socket.on("delivered", delivered);
//   function delivered(payload) {
//     let order = {
//       event: "delivered",
//       time: new Date(),
//       payload,
//     };
//     console.log("Event", order);
//     caps.emit('deliveredV',payload)
//   }
    
   
// })

'use strict';

const uuid = require('uuid').v4
// keep port in dotenv
const io = require('socket.io')(3000);
// can be stored in a database/ cache/ ...
// my queue is an object
// keyed queue

//  there will be no ordered preserved
const msgQueue = {
    chores : {}
}

const family = io.of('/family'); //namespace
family.on('connection', socket=> {
    console.log("CONNECTED", socket.id)
    // when the parent adds a new chore
    socket.on('new_chore', payload=> {
        console.log("adding a new task ....")
        const id = uuid();
        console.log("id ====> ", id)
        msgQueue.chores[id] = payload;
        socket.emit('added', payload); // telling the parent a task was added
        family.emit('chore', {id: id, payload: msgQueue.chores[id]});
        console.log("after add msgQueue ========> ", msgQueue)
    });

    socket.on('get_all', ()=> {
        console.log("get_all : child wants to get its msgs ")
        Object.keys(msgQueue.chores).forEach(id=> {
            socket.emit('chore', {id: id, payload: msgQueue.chores[id] })
        });
    });

    socket.on('received', msg => {
        console.log("received on queue will remove it ...")
        // he child confirmed receiving , remove from queue
        delete msgQueue.chores[msg.id];
        console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue)
    })
});