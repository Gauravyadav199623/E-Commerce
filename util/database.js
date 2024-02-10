const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;



let _db;

const mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://gauravyadav199623:2W9IkSwoc34JvuL3@cluster0.arquneu.mongodb.net/shop?retryWrites=true&w=majority')

  .then(client=>{
    console.log("connected!!");
    _db=client.db() //storing connection to the database in _db
    callback()
  })
  .catch(err=>{
    console.log(err);
    throw err
  });
};


const getDb=()=>{ //return access to that data base
  if(_db){
    return _db
  }
  throw "no database found"
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

