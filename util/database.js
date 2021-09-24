const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://willy:G33Kr0uJhV7xYb5T@cluster0.7uqja.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err)
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No Database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;