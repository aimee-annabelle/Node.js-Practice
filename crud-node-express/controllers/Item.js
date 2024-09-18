const ItemModel = require("../model/item");
const uuid = require("uuid");

const validateItem = (item) => {
  return item.name && item.price;
};

exports.createItem = async (req, res) => {
  if (!validateItem(req.body))
    res.status(400).send({ message: "Content can not be empty!" });
  const item = new ItemModel({
    id: uuid.v6(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  await item
    .save()
    .then((data) =>
      res.status(201).send({ message: "Item saved successfully", data: data })
    )
    .catch((err) =>
      res
        .status(500)
        .send(`${err.message}` || "An error occurred while creating item")
    );
};

exports.getItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .send(`${err.message}` || "An error occurred while retrieving items");
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await ItemModel.findOne({id: req.params.id});
    res.status(200).json(item);
  } catch (err) {
    res
      .status(500)
      .send(`${err.message}` || "An error occurred while retrieving item");
  }
};

exports.updateItem = async (req, res) => {
  if (!req.body) res.status(404).send("Data to update can not be empty");
  const id = req.params.id;
  await ItemModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) =>
      res.status(200).send({ message: "data updated successfully", data: data })
    )
    .catch((err) =>
      res
        .status(500)
        .send(`${err.message}` || "An error occurred while updating item")
    );
};

exports.deleteItem = async (req, res) => {
  await ItemModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) res.status(404).send("Item not found");
      res.status(200).send("Item deleted successfully");
    })
    .catch((err) =>
      res
        .status(500)
        .send(`${err.message}` || "An error occurred while deleting item")
    );
};
