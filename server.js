
const http = require('http');

const app = require('./src/app');

const server = http.createServer(app);
//our routes 


require('dotenv').config();


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


