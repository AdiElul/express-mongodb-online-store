const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})
	.then((client) => {
		db = client.db('online-store');
		console.log('Connected to DB');
	})
	.catch(() => console.log('Could not connect to DB'));

module.exports = function() {
	return db;
};