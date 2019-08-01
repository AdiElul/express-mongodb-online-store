

const ObjectId = require("mongodb").ObjectId;
const db = require("../db");

module.exports = {
  getAll: (req, res) => {
    db()
      .collection("products")
      .find({})
      .toArray()
      .then(products => res.json(products));
  },

  getProduct: (req, res) => {
    db().collection('products')
        .findOne({_id: ObjectId(req.params.id)})
        .then(product => res.json(product));
},

  createProduct: (req, res) => {
    db()
      .collection("products")
      .insertOne(req.body)
      .then(obj => res.status(201).json(obj.ops[0]));
  },

  deleteProduct: (req, res) => {
    db()
      .collection("products")
      .findOne({ _id: ObjectId(req.params.id) })
      .then(product => {
        if (product) {
          db()
            .collection("products")
            .deleteOne({ _id: ObjectId(product._id) })
            .then(() => res.status(204).send());
        } else {
          res.status(404).send();
        }
      });
  }
};
