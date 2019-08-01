

const ObjectId = require("mongodb").ObjectId;
const db = require("../db");

module.exports = {
  getAll: (req, res) => {
    db()
      .collection("categories")
      .find({})
      .toArray()
      .then(categories => res.json(categories));
  },

  getCategory: (req, res) => {
    db().collection('categories')
        .findOne({_id: ObjectId(req.params.id)})
        .then(category => res.json(category));
},

  createCategory: (req, res) => {
    db()
      .collection("categories")
      .insertOne(req.body)
      .then(obj => res.status(201).json(obj.ops[0]));
  },

  deleteCategory: (req, res) => {
    db()
      .collection("categories")
      .findOne({ _id: ObjectId(req.params.id) })
      .then(category => {
        if (category) {
          db()
            .collection("categories")
            .deleteOne({ _id: ObjectId(category._id) })
            .then(() => res.status(204).send());
        } else {
          res.status(404).send();
        }
      });
  }
};

