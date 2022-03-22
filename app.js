const express = require('express');
const app = express();
const Dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser')
var bridge = null;
const config = {

};
Dialer.configure(config);  
app.use(cors())
app.use(bodyParser())

app.listen(3000, () => {
   console.log('app listening on port 3000');
});

app.get('/call/:number1/:number2', (req, res) => {
   const number1 = req.params.number1;
   const number2 = req.params.number2;
  
   Dialer.call(number1,number2);
   res.json({success: true});
})
 
app.get('/status', async (req, res) => {
  let status = 'NONE';
if (bridge !== null) {
  status = await bridge.getStatus();
}
 res.json({success: true, status: status});
});

app.post('/call/', async (req, res) => {
   const body = req.body;
   const number1 = body.number;
   const number2 = 793218555;
   console.log('dzwonie', number1, number2)
   bridge = await Dialer.call(number1, number2);
   res.json({ success: true });
})
  