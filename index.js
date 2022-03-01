const express = require('express');
const app = express();

app.listen(3000, () => {
   console.log('app listening');
});

app.get('/', (req, res) => {
   res.json({success: true});
})

function getPromise() {
   return new Promise((resolve, reject) => {
       const a = Math.random();
       resolve(a);
   })
}


app.get('/promise', (req, res) => {
   let results = [];
   getPromise()
   .then((result) => {
       results.push(result)
   })
   .then(getPromise)
   .then((result) => {
       results.push(result)
   }).then(() => {
       res.json({success:true, results: results})
   })
})
