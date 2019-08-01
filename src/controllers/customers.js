const ObjectId = require("mongodb").ObjectId;
const db = require("../db");

module.exports = {
  getAll: (req, res) => {
    db()
      .collection("customers")
      .find({})
      .toArray()
      .then(customers => res.json(customers));
  },

  getCustomer: (req, res) => {
    db().collection('customers')
        .findOne({_id: ObjectId(req.params.id)})
        .then(customer => res.json(customer));
},

  createCustomer: (req, res) => {
    db()
      .collection("customers")
      .insertOne(req.body)
      .then(obj => res.status(201).json(obj.ops[0]));
  },

  deleteCustomer: (req, res) => {
    db()
      .collection("customers")
      .findOne({ _id: ObjectId(req.params.id) })
      .then(customer => {
        if (customer) {
          db()
            .collection("customers")
            .deleteOne({ _id: ObjectId(customer._id) })
            .then(() => res.status(204).send());
        } else {
          res.status(404).send();
        }
      });
  }
};
