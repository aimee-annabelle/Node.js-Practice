const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
} = require("../controllers/Item");
const router = express.Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
module.exports = router;
