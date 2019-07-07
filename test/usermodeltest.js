//const mongoose = require('mongoose');
let {User} = require('../models/usermodel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let {app} = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('/get user', ()=> {

  it('it should get all users', () => {

    chai.request(app).get('/api/users').end((err,res) =>{

      res.should.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(4);
    });
  });
});

describe('/post user', ()=> {

  it('it should post a  user', () => {

    let addeduser = {
      username : "test user",
      email : "testuser@hotmail.com",
      password : "testuser",
      firstname : "test",
      lastname : "user"
    };
    chai.request(app).post('/api/users').send(addeduser).end((err,res) =>{

      res.should.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('username');
    });
  });
});

describe('/get user/user id', ()=> {

  it('it should get the user with a certain id ', () => {

    let addeduser = new User ({
      username : "test user to get",
      email : "testusertoget@hotmail.com",
      password : "testusertoget",
      firstname : "test get",
      lastname : "user get"
    });
    addeduser.save((error, user ) =>{
      chai.request(app).get('/api/users/' + addeduser.id)
      .send(addeduser).end((err,res) =>{

        res.should.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.length.should.have.property(_id).eql(addeduser.id);
      });
    });
    
  });
});
describe('/put /user id', ()=> {

  it('it should put the user with a certain id ', () => {

    let updateduser = new User ({
      username : "test user update",
      email : "testusertoupdate@hotmail.com",
      password : "testusertoupdate",
      firstname : "test update",
      lastname : "user update"
    });
    updateduser.save((error, user ) =>{
      chai.request(app).put('/api/users/' + addeduser.id)
      .send({username : "update user", password : "updateuser"}).end((err,res) =>{

        res.should.status(200);
        res.body.should.be.a('object');
        res.body.length.should.have.property('username').eql('update user');
      });
    });
    
  });
});