const express = require('express');
const app = express();
const Dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser')
let bridge = null;
const config = {
   url: 'https://uni-call.fcc-online.pl',
   login: 'focus16',
   password: 'njhipjwr4kf'
};

Dialer.configure(config);  

app.listen(3000, () => {
   console.log('app listening on port 3000');
});
app.use(cors());
app.use(bodyParser());
app.get('/call/:number1/:number2', async (req, res) => {
   const number1 = req.params.number1;
   const number2 = '792751705';
  
   bridge = await Dialer.call(number1, number2);
   res.json({success: true});
  })
  
  app.get('/status', async (req, res) => {
     let status = 'NONE';
   if (bridge !== null) {
     status = await bridge.getStatus();
   }
    res.json({success: true, status: status});
  });
  
  app.post('/call/', (req, res) => {
   const {number} = req.body;
   console.log('body',body);
   bridge = Dialer.call(number1, number2);
   res.json({ success: true });
  })
  
