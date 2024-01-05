module.exports = app => {
  const lists = require("../controller/list.controller.js");

  var router = require("express").Router();

  // Create a new List
  router.post("/", lists.create);

  // Retrieve all lists
  router.get("/", lists.findAll);

  // Retrieve all published lists
  router.get("/published", lists.findAllPublished);

  // Retrieve a single List with title
  router.get("/:title", lists.findOne);

  // Update a List with id
  router.put("/:id", lists.update);

  // Delete a List with id
  router.delete("/:id", lists.delete);

  // Delete all lists
  router.delete("/", lists.deleteAll);

  app.use('/api/lists', router);
};