const mongodb=require('mongodb');
// const { getDb } = require('../util/database');

getDb=require("../util/database").getDb


class User{
  constructor(name,email){
    this.name=name;
    this.email=email
  }

  save(){
    db=getDb();
    db.collection('user')
    .insertOne(this)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }


  static findById(prodId){
    const db=getDb()
    db.collection('user').find({_id:new mongodb.ObjectId(prodId)}).next()
    .then(user=>{
      console.log(user)
      return user
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
