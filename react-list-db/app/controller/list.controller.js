const db = require("../models");
const List = db.lists;
const Op = db.Sequelize.Op;

// Create and Save a new List
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a List
  const list = {
    title: req.body.title,
  };
  
  // Save List in the database
  List.create(list)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

// Retrieve all Lists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  List.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lists."
      });
    });
};

// Find a single List with an id
exports.findOne = (req, res) => {
  const title = req.params.title;

  List.findOne({where: {title: title}})
    .then(data => {
      if(data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find List with title=${title}.`
        });
      }
    })
};

// Update a List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  List.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "List was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating List with id=" + id
      });
    });
};

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  List.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "List was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete List with id=${id}. Maybe List was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete List with id=" + id
      });
    });
};

// Delete all Lists from the database.
exports.deleteAll = (req, res) => {
  List.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Lists were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lists."
      });
    });
};

// find all published List
exports.findAllPublished = (req, res) => {
  List.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lists."
      });
    });
};