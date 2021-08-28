"use strict";

const http = require("http").createServer();
const uuid = require("uuid").v4;

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const msgQueue = {
  orders: {},
};

http.listen(8080, () => console.log("listening on http://localhost:8080"));
const FOOD = io.of("/food");

FOOD.on("connection", (socket) => {
  console.log("one customer has been connected", socket.id);

  socket.on("message", (message) => {
    const id = uuid();
    console.log(message);
    msgQueue.orders[id] = message;

    // console.log( 'added to queueu===>>>',msgQueue.orders[id])
    FOOD.emit("message", message);
    // console.log("after add msgQueue ========> ", msgQueue.orders)

    FOOD.emit("order", { id: id, payload: msgQueue.orders[id] });
    let order = {
      event: "pickup",
      time: new Date(),
      message,
    };
    console.log("Event", order);
  });

  socket.on("get_all", () => {
    console.log("get_all : driver wants to get has orders   ");
    Object.keys(msgQueue.orders).forEach((id) => {
      socket.emit("order", { id: id, payload: msgQueue.orders[id] });
    });
  });

  socket.on("received", (msg) => {
    console.log("=============================>", msg);
    // he child confirmed receiving , remove from queue
    delete msgQueue.orders[msg.id];

    console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue.orders);

    // caps.emit('pickedUp',msg)
  });

  socket.on("in-transit", inTransit);
  function inTransit(payload) {
    FOOD.emit("trinzet", payload);
    let order = {
      event: "in-transit",
      time: new Date(),
      payload,
    };
    console.log("Event", order);
    
  }

  // delivered
  socket.on("delivered", delivered);
  function delivered(payload) {
    let order = {
      event: "delivered",
      time: new Date(),
      payload,
    };
    console.log("Event", order);
    FOOD.emit("deliveredV", payload);
  }
});
