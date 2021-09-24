const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://willy:G33Kr0uJhV7xYb5T@cluster0.7uqja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err)
    });
}

module.exports = mongoConnect;