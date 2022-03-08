const express = require('express');
const app = express();

app.listen(3000, () => {
   console.log('app listening');
});

app.get('/', (req, res) => {
   res.json({success: true});
})

app.get('/call/:status', async (req, res) => {
    const status = req.params.status;
    let id = await getRandomIdAsPromise();
    res.json({'success': true, id: id, status: status})
 })
 
 function getRandomIdAsPromise() {
    return new Promise((resolve, reject) => {
        getRandomId((randomId) => {
            resolve(randomId)
        })
    })
 }
 
 
 
 function getRandomId(callback) {
    setTimeout(() => {
        var random = Math.round(Math.random()*10000)
        callback(random);
    }, Math.round(Math.random()*1000))
 }
 