# node-js app :
The project consists of CRUD operation, testing the endpoints, authenticating using jwt, dockerizing the app, adding swagger

# prerequists
npm : [download npm ](https://www.npmjs.com/)

nodejs: [download nodejs](https://nodejs.org/en/download/)


# installation
```bash
installing express package
```
```bash
installing mongoose package
```
#### for testing:
```bash
download mocha
```
```bash
download chai
```
#### for authentication:
```bash
installing jwt package
```
#### for docker
```bash
setup docker
```
#### for swagger
```bash
installing swagger
```

# functions and modules
/model/usermodel.js : contains the schema and the basic validate function

/config/custom-environment-variable: contains the variable jwtPrivatekey, needed for authontication

#### /routes : contain the implementation
/routes/users.js : contain the implementation of the CRUD operation, and the yaml for the swagger documentation

/routes/auth.js: contain the implementation of the authentication function with the private key environment variable

/test/usermodeltest.js: contain the unit tests of the basic operation

#### index.js : contain the basic connections ( connection to localhost ,connection to mongoose, connection with the swagger-docs and api)

# how to use
to run the program : 

-set the jwtprivateKey : set task_jwtPrivateKey={variable}

-operate with node : node index.js

to test the program :

npm test

