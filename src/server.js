const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const morgan = require("morgan");
const customers = require("./controllers/customers");
const products = require("./controllers/products");
const categories = require("./controllers/categories");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send();
});

app.put("/customer", customers.createCustomer);
app.get("/customer", customers.getAll);
app.get("/customer/:id", customers.getCustomer);

app.put("/product", products.createProduct);
app.get("/product", products.getAll);
app.get("/product/:id", products.getProduct);
app.delete("/product/:id", products.deleteProduct);

app.put("/category", categories.createCategory);
app.get("/category", categories.getAll);
app.get("/category/:id", categories.getCategory);
app.delete("/category/:id", categories.deleteCategory);


app.listen(port, () => {
  require("./db");
  console.log(`Example app listening on port ${port}!`);
});
