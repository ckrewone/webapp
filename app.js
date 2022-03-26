const express = require('express');
const app = express();
const Dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser')
const { Server } = require('socket.io');

let bridge = null;
const config = require('./config');

console.log(config);

Dialer.configure(config);  

const server = app.listen(3000, () => {
   console.log('app listening on port 3000');
});
const io = new Server(server) 
io.on("connection", (socket) => { // nasłuchujemy na rozpoczęcie połączenia
   console.log('Połączono socket');
   io.emit("status", 5555);
 });

app.use(cors());
app.use(bodyParser());
app.get('/api/call/:number1/:number2', async (req, res) => {
   const number1 = req.params.number1;
   const number2 = '792751705';
  
   bridge = await Dialer.call(number1, number2);
   res.json({success: true});
  })
  
  app.get('/api/status', async (req, res) => {
     let status = 'NONE';
   if (bridge !== null) {
     status = await bridge.getStatus();
   }
    res.json({success: true, status: status});
  });
  
  app.post('/api/call/', async (req, res) => {
   const body = req.body;
   const number1 = body.number;
   const number2 = '792751705';
   bridge = await Dialer.call(number1, number2);

   let oldStatus = null
   let interval = setInterval(async () => {
      let currentStatus = await bridge.getStatus();
      if (currentStatus !== oldStatus) {
         oldStatus = currentStatus
         io.emit('status', currentStatus)
      }
      if (currentStatus === 'ANSWERED') {
         clearInterval(interval)
      }
   }, 1000)

   res.json({ success: true });
  })
  
