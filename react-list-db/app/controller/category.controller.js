const db = require("../models");
const Category = db.category;
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
  const category = {
    title: JSON.stringify(req.body.title).replaceAll('"', ''),
    description: JSON.stringify(req.body.description).replaceAll('"', ''),
    listId: req.body.listId
  };
  
  // Save List in the database
  Category.create(category)
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

// Find a single List with an id
exports.findOne = (req, res) => {
    const listId = req.params.listId;
  
    Category.findOne({where: {listId: listId}})
      .then(data => {
        if(data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find List with listId=${listId}.`
          });
        }
      })
  };

// Retrieve all Lists from the database.
exports.findAll = (req, res) => {
  const listId = req.body.listId;
  var condition = listId ? { listId: { [Op.like]: `%${listId}%` } } : null;

  Category.findAll({ where: condition})
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

// // Find a single List with an id
// exports.findOne = (req, res) => {
//   const title = req.params.title;

//   List.findOne({where: {title: title}})
//     .then(data => {
//       if(data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find List with title=${title}.`
//         });
//       }
//     })
// };

// // Update a List by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      res.send(num)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating List with id=" + id
      });
    });
};

// // Delete a List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 1
        });
      } else {
        res.send({
          message: 0
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete List with id=" + id
      });
    });
};

// // Delete all Lists from the database.
// exports.deleteAll = (req, res) => {
//   List.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Lists were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all lists."
//       });
//     });
// };

// // find all published List
// exports.findAllPublished = (req, res) => {
//   List.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving lists."
//       });
//     });
// };