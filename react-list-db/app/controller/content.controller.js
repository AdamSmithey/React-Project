const db = require("../models");
const Content = db.contents;
const Op = db.Sequelize.Op;

// Create and Save a new List
exports.create = (req, res) => {

  // Create a List
  const content = {
    content: req.body.content,
    description: req.body.description,
    index: req.body.index,
    categoryId: req.body.categoryId
  };
  
  // Save List in the database
  Content.create(content)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
    });
};

// Retrieve all Lists from the database.
exports.findAll = (req, res) => {

  Content.findAll({ where: {categoryId: req.query.categoryId} })
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
// exports.update = (req, res) => {
//   const id = req.params.id;

//   List.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "List was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating List with id=" + id
//       });
//     });
// };

// Delete a List with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Content.destroy({
    where: { id: id }
  })
    .then(num => {
      res.send({
        message: `${num}`
      });
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