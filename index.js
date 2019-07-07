const config = require('config');
const mongoose = require('mongoose');
const { router, User} = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

// if(! config.get('jwtPrivateKey') ){
//     console.error('fatal error');
//     process.exit(1);
// }

const app = express();
app.use(express.json());

var swaggerDefinition = {
    info : {
        title: 'node swagger api',
        version : '1.0.0',
        description : 'description of the node-js app'
    },
    localhost : 'localhost:3000',
    basePath  : '/'
};
var options = {
    swaggerDefinition : swaggerDefinition,
    apis : [ './**/routes/*.js','routes.js' ]
};
const swaggerSpec = swaggerJSDoc(options);


app.use('/api/users',User);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/Task')
    .then(() => console.log('database is connected'))
    .catch(err => console.log('there is an error in connection',err));


app.get('/api/swagger.json',function(req,res) {
    res.setHeader('Content-Type','applicationj/son');
    res.send(swaggerSpec);
    //console.log('taghrid');
    //console.log(swaggerSpec);
});
  

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port `));

module.exports.app = app;
//module.exports.swaggerSpec = swaggerSpec;
console.log("l");